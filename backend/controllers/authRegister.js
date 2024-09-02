import mongoose from "mongoose";
import User from "../models/User.js";
import userRegistrationSchema from "../config/validationSchema.js";
import generateToken from "../config/generateToken.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    userRegistrationSchema.parse({
      name,
      email,
      password,
    });
  } catch (e) {
    return res.status(400).json({
      e,
    });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
  } catch (error) {
    console.log("error in finding exisitng user", error);
  }
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.log("error creating user", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export default registerUser;
