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

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {

    if (err) {
      return res.status(500).json({ msg: "Server error" });
    }

    if (!user) {
      return res.status(401).json({ msg: info?.message || "Invalid credentials" });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ msg: "Login session failed" });
      }

      return res.json({
        msg: "Login success",
        user: {
          id: user._id,
          email: user.email
        }
      });
    });

  })(req, res, next);
});


// LOGOUT
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ msg: "Logged out" });
  });
});

export default router;
