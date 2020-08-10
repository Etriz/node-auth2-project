const express = require("express");
const db = require("../users/users-model");
const restricted = require("../auth/restricted-middleware");
// const checkDept = require("../auth/check-dept-middleware");

const router = express.Router();

router.get("/", restricted, async (req, res) => {
  try {
    const data = await db.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Must be logged in" });
  }
});

module.exports = router;
