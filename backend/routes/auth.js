import express from "express";
import User from "../models/User.js";
import passport from "passport";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Signup request:", email, password);   // 👈 DEBUG

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = await User.create({ email, password });

    res.json({ msg: "Signup success" });

  } catch (err) {
    console.log("SIGNUP ERROR 👉", err);   // 👈 REAL ERROR DIKHEGA
    res.status(500).json({ error: err.message });
  }
});


// LOGIN
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({
    msg: "Login success",
    user: {
      id: req.user._id,
      email: req.user.email
    }
  });
});

// LOGOUT
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ msg: "Logged out" });
  });
});

export default router;
