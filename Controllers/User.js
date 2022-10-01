import User from "../Models/User.js";
import { v4 as uuidv4 } from "uuid";
import Owner from "../Models/Owner.js";
import Property from "../Models/Property.js";
import _ from 'lodash'
// update user

export const updateUser = async (req, res) => {
  // if (req.body.password) {
  //     req.body.password = bcrypt.hash(password, 12);
  //   }

  try {
    const oldUser = await User.findById(req.params.id)
    if(!oldUser) return res.status(400).json({message:"user not found"})
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const selectedProp = _.pick(updatedUser,['_id','companyId','firstName','lastName','profile','email','phone','isAdmin','hasCompany','createdAt','updatedAt'])
    res.status(201).json(selectedProp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create company(update user to give compnayId access)

export const createCompany = async (req, res) => {
  try {
    const oldUser = await User.findById(req.params.id)
    if(!oldUser) return res.status(400).json("user not found")
    const userCompany = await User.findByIdAndUpdate(
      req.params.id,
      { companyId: req.body.companyId,hasCompany:true },
      { new: true }
    );
    console.log(userCompany)
    res.status(200).json(userCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// profile for relators

export const userProfile = async (req, res) => {
  try {
    const user = await User.findOne({companyId:req.params.companyId})
    const owner = await Owner.findOne({companyId:req.params.companyId})

    res.status(200).json({success:true,data:{user:user,company:owner}});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add to Favorites

export const addToFavorites=async(req,res)=>{
   try {
    const oldUser = await User.findById(req.params.id)
    if(!oldUser) return res.status(400).json("user not found")
    const userFavorites = await User.findByIdAndUpdate(
      req.params.id,
      { favorites: req.body },
      { new: true }
    );
    res.status(200).json({success:true,data:{user:userFavorites,company},message:"successfully added to favorites"});

   } catch (error) {
    res.status(500).json({ message: error.message });
   }
}


//profile for app

export const userAppProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    res.status(200).json({success:true,data:{user:user}});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};