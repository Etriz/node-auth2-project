const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../users/users-model");
const secrets = require("../config/secrets");

const router = express.Router();

router.post("/register", async (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  try {
    const saved = await db.add(user);
    res.status(201).json(saved);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.findBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      // generate token and include in response
      const token = generateToken(user);
      res.status(200).json({ message: `Welcome ${user.username}`, token });
    } else {
      res.status(401).json({ message: "Invalid Username or Password" });
    }
  } catch (error) {
    res.status(500).json({ error: "login error" });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    dept: user.dept,
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secret, options);
}

router.get("/logout", (req, res) => {});

module.exports = router;
