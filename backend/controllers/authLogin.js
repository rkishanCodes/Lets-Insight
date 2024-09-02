import generateToken from "../config/generateToken.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("error in login", error);
  }
};

export default loginUser;
