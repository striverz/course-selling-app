const express = require("express");
const userRouter = express.Router();
const { authUser } = require("../middlewares/authUser");

userRouter.get("/userinfo", authUser, (req, res) => {
  try {
    res.json({
      data: req.user,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = {
  userRouter,
};
