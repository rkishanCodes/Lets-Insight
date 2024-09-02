import express from "express";
import passport from "../config/passport.js";
import User from "../models/User.js";
import registerUser from "../controllers/authRegister.js";
import loginUser from "../controllers/authLogin.js";
import authGetUserProfile from "../controllers/authGetUserProfile.js";
import protect from "../middleware/authMiddleware.js";
import generateToken from "../config/generateToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, authGetUserProfile);

// Google Login Route
router.get(
  "/google/login",
  passport.authenticate("google-login", { scope: ["profile", "email"] })
);

// Google Registration Route
router.get(
  "/google/register",
  passport.authenticate("google-register", { scope: ["profile", "email"] })
);

// Callback route for Google login
router.get("/google/callback/login", (req, res, next) => {
  passport.authenticate(
    "google-login",
    { failureRedirect: "http://localhost:5173/login" },
    (err, user, info) => {
      if (err || !user) {
        return res.redirect("http://localhost:5173/login");
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        const token = generateToken(user._id);
        res.redirect(`http://localhost:5173/login?token=${token}`);
      });
    }
  )(req, res, next);
});

// // Callback route for Google registration
// router.get("/google/callback/register", (req, res, next) => {
//   passport.authenticate(
//     "google-register",
//     { failureRedirect: "http://localhost:5173/register" },
//     (err, user, info) => {
//       if (err || !user) {
//         console.log(user);
//         return res.redirect("http://localhost:5173/register");
//       }

//       if (user && info && info.message === "User already registered") {
//         // User is already registered with this Google account
//         return res.redirect("http://localhost:5173/register?exists=true");
//       }

//       // Successful registration scenario
//       req.login(user, (err) => {
//         if (err) {
//           return next(err);
//         }
//         const token = generateToken(user._id);
//         res.redirect(`http://localhost:5173/login?token=${token}`);
//       });
//     }
//   )(req, res, next);
// });

router.get("/google/callback/register", (req, res, next) => {
  passport.authenticate(
    "google-register",
    { failureRedirect: "http://localhost:5173/register" },
    (err, user, info) => {
      if (err) {
        console.error("Error during Google registration:", err);
        return res.redirect("http://localhost:5173/register");
      }

      console.log("User:", user);
      console.log("Info:", info);

      if (info && info.message === "User already registered") {
        // User is already registered with this Google account
        console.log("check is executeing");
        return res.redirect("http://localhost:5173/register?exists=true");
      }

      if (!user) {
        // Handle case where user is not authenticated
        return res.redirect("http://localhost:5173/register");
      }

      // Successful registration scenario
      req.login(user, (err) => {
        if (err) {
          console.error("Error during login:", err);
          return next(err);
        }
        const token = generateToken(user._id);
        res.redirect(`http://localhost:5173/login?token=${token}`);
      });
    }
  )(req, res, next);
});

router.get("/", (req, res) => {
  res.send("auth");
});

export default router;
