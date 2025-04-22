const express = require("express");
const courseRouter = express.Router();
const { authUser } = require("../middlewares/authUser");

courseRouter.post("/purchase", authUser, (req, res) => {
  try {
    res.json({
      message: "Cohort-3",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

courseRouter.get("/preview", authUser, (req, res) => {
  try {
    res.json({
      message: "100xDevs",
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});
module.exports = {
  courseRouter,
};
