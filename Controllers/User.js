import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import Owner from "../Models/Owner.js";
import Property from "../Models/Property.js";
import AgentCompany from "../Models/AgentCompany.js";
import _ from 'lodash'
// update user

export const updateUser = async (req, res) => {
 
  try {
    const oldUser = await User.findById(req.params.id)
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt)
      req.body.password = hashed
    }
    if(!oldUser) return res.status(400).json({message:"user not found"})
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const selectedProp = _.pick(updatedUser,['_id','companyId','firstName','lastName','profile','email','phone','isAdmin','hasCompany',"status",'createdAt','updatedAt'])
    res.status(201).json({success:true,data:selectedProp});
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
    const owner = await AgentCompany.findOne({companyId:req.params.companyId})

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
    const selectedProp = _.pick(user,['_id','companyId','firstName','lastName','profile','email','phone','isAdmin','hasCompany','status','createdAt','updatedAt'])

    res.status(200).json({success:true,profile:selectedProp});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//get single user
export const getSingleUser = async (req, res) => {
  try {
    const singleUser = await User.findById(req.params.id);
    if(!singleUser) return res.status(404).json({ message: "user  not found" });
     res.status(200).json({success:true,data:singleUser})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
