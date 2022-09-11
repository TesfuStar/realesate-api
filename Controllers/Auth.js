import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "@hapi/joi";
export const signIn = async (req, res) => {
  try {
    const schema = Joi.object().keys({
      phone: Joi.number().required(),
      password: Joi.string().required(),
    });
    const joeResult = await schema.validateAsync(req.body);

    if (joeResult.error)
      return res
        .status(400)
        .json({ message: joeResult.error.details[0].message });

    const oldUser = await User.findOne({ phone: joeResult.phone });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      joeResult.password,
      oldUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ phone: oldUser.phone }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    if (error.isJoi === true)
      return res.status(400).json({ message: error.details[0].message });
    res.status(500).json({ message: "Something went wrong please try later!" });
  }
};

export const signUp = async (req, res) => {
  try {
    const schema = Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().lowercase().required(),
      phone: Joi.number().required(),
      password: Joi.string().required(),
    });
    const joeResult = await schema.validateAsync(req.body);

    if (joeResult.error)
      return res
        .status(400)
        .json({ message: joeResult.error.details[0].message });

    let oldUser = await User.findOne({ phone: joeResult.phone });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(joeResult.password, salt);

    const result = await User.create({
      phone: joeResult.phone,
      password: hashedPassword,
      name: joeResult.name,
    });

    const token = jwt.sign({ phone: result.phone }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    if (error.isJoi === true)
      return res.status(400).json({ message: error.details[0].message });

    res.status(500).json({ message: "Something went wrong please try later!",error });
  }
};