import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "@hapi/joi";
import _ from 'lodash'
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

    const token = jwt.sign(
      {
        phone: oldUser.phone,
        isAdmin: oldUser.isAdmin,
        companyId: oldUser.companyId,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1d",
      }
    );
    const selectedProp = _.pick(oldUser,['_id','companyId','firstName','lastName','profile','email','phone','isAdmin','hasCompany','status','createdAt','updatedAt'])

    res.status(200).json({ result:selectedProp, token });
  } catch (error) {
    if (error.isJoi === true)
      return res.status(400).json({ message: error.details[0].message });
    res.status(500).json({ message: "Something went wrong please try later!" });
  }
};

export const signUp = async (req, res) => {
  try {
    const schema = Joi.object().keys({
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      phone: Joi.number().optional(),
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(6).required(),
      
    });
    const joeResult = await schema.validateAsync(req.body);

    if (joeResult.error)
      return res
        .status(400)
        .json({ message: joeResult.error.details[0].message });

    let oldEmail = await User.findOne({ email: joeResult.email });

    if (oldEmail)
      return res.status(400).json({ message: "email already in use" });
      let oldPhone = await User.findOne({ phone: joeResult.phone });
      if (oldPhone)
      return res.status(400).json({ message: "phone already in use" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(joeResult.password, salt);

    const result = await User.create({
      email: joeResult.email,
      phone: joeResult.phone,
      password: hashedPassword,
      firstName: joeResult.firstName,
      lastName: joeResult.lastName,
    });
    const token = jwt.sign({ email: result.email }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    const selectedProp = _.pick(result,['_id','companyId','firstName','lastName','profile','email','phone','isAdmin','hasCompany','status','createdAt','updatedAt'])
    res.status(201).json({ result:selectedProp, token });
  } catch (error) {
    if (error.isJoi === true)
      return res.status(400).json({ message: error.details[0].message });

    res
      .status(500)
      .json({ message: "Something went wrong please try later!", error });
  }
};
