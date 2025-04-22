const express = require("express");
const adminRouter = express.Router();

adminRouter.post("/signup", (req, res) => {
  try {
    res.json({
      message: "admin signup",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});
adminRouter.post("/signin", (req, res) => {
  try {
    res.json({
      message: "admin signin",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});
adminRouter.post("/course", (req, res) => {
  try {
    res.json({
      message: "admin courses",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});
adminRouter.put("/course", (req, res) => {
  try {
    res.json({
      message: "admin updates courses",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = {
  adminRouter,
};
