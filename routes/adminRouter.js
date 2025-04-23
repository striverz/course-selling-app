const express = require("express");
const adminRouter = express.Router();
const { validatingUserInfo } = require("../utils/Validation");
const bcrypt = require("bcrypt");
const { AdminModel } = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const { authAdmin } = require("../middlewares/authAdmin");
const { CourseModel } = require("../models/courseModel");

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
      message: "The Admin Signup Successful",
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
adminRouter.post("/course", authAdmin, async (req, res) => {
  try {
    const { title, description, imageURL, price } = req.body;
    const adminId = req.adminId;
    const course = await CourseModel.create({
      title,
      description,
      imageURL,
      price,
      creatorId: adminId,
    });

    res.json({
      message: "Course Added Successfully",
      courseId: course._id,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});
adminRouter.patch("/course", authAdmin, async (req, res) => {
  try {
    const adminId = req.adminId;
    const { description, title, price, courseId } = req.body;
    await CourseModel.findOneAndUpdate(
      {
        //filters
        creatorId: adminId,
        _id: courseId,
      },
      {
        description,
        price,
        title,
      }
    );

    res.json({
      message: "The course updated Successfully",
      courseId,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});
adminRouter.get("/course", authAdmin, async (req, res) => {
  try {
    const adminId = req.adminId;
    const allCourses = await CourseModel.find({
      creatorId: adminId,
    });
    res.json({
      message: "The Course of yours are",
      allCourses,
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
