import express from "express";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

const admin_route = express.Router();

admin_route.post("/admin_register", async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send("Enter valid email address");
    }
    if (!req.body.password) {
      return res.status(400).send("Enter valid password ");
      }
      const admin_details = {
          email: req.body.email,
          password: req.body.password,
      }  
      const admin = await Admin.create(admin_details);
      res.status(200).send({ admin });
  } catch (err) {
    console.log("error", err);
    res.status(500).send("Error in admin login");
  }
});

admin_route.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).send("Please enter valid email")
        }
        if (!password) {
          return res.status(400).send("Please enter valid password");
        }

        const admin_details = await Admin.findOne({ email: email })
        
        if (admin_details && password === admin_details.password) {
            return res.status(200).send("Login Success")
        }

        return res.status(400).send("No Admin Found");

    }
    catch (err) {
        console.log("Error", err)
        res.status(500).send("Error in admin login");
    }


})


admin_route.get("/users", async (req, res) => {
  try {
    const user_list = await User.find({});
    if (!user_list) {
      return res.status(404).send("No users found");
    }
    res.status(200).send(user_list);
  } catch (err) {
    console.log("error", err);
    res.status(500).send("Error fetching users");
  }
});


admin_route.delete("/:id", async (req,res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  }
  catch (err) {
    console.log("Error", err);
    res.status(500).send("Error deleting users");
  }
}) 


export default admin_route;

