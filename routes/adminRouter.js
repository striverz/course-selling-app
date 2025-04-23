const express = require("express");
const adminRouter = express.Router();
const { validatingUserInfo } = require("../utils/Validation");
const bcrypt = require("bcrypt");
const { AdminModel } = require("../models/adminModel");
const jwt = require("jsonwebtoken");

adminRouter.post("/signup", async (req, res) => {
  try {
    //validating the user details
    const isValidDetails = validatingUserInfo(req.body);
    if (!isValidDetails) throw new Error(isValidDetails);

    //after the uservalidation successful
    const { firstName, lastName, emailId, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    await AdminModel.create({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    res.json({
      message: "The User Signup Successful",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});
adminRouter.post("/signin", async (req, res) => {
  try {
    const emailId = req.body.emailId;
    const password = req.body.password;

    const user = await AdminModel.findOne({
      emailId,
    });

    if (!user) throw new Error("User Not found for Login!");
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new Error("The password is not valid");

    //everything was fine then create a token for the admin user
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_ADMIN_SECRET
    );

    res.cookie("token", token);
    res.json({
      message: "Admin Login Successful!",
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
adminRouter.patch("/course", (req, res) => {
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

adminRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.json({
      message: "The Adming Logout Successful!",
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
