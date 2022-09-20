import User from "../Models/User.js";
import { v4 as uuidv4 } from "uuid";

// update user

export const updateUser = async (req, res) => {
  // if (req.body.password) {
  //     req.body.password = bcrypt.hash(password, 12);
  //   }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedUser);
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
      { companyId: uuidv4() },
      { new: true }
    );
    console.log(userCompany)
    res.status(200).json(userCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};