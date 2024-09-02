import User from "../models/User.js";

const authGetUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("error in fetching details", error);
  }
};

export default authGetUserProfile;
