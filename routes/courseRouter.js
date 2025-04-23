const express = require("express");
const courseRouter = express.Router();
const { authUser } = require("../middlewares/authUser");
const { courseModel, CourseModel } = require("../models/courseModel");
const { PurchaseModel } = require("../models/purchaseModel");

courseRouter.post("/purchase", authUser, async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId } = req.body;

    await PurchaseModel.create({
      userId,
      courseId,
    });

    res.json({
      message: "The Course Purchase is successful",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

courseRouter.get("/purchase", authUser, async (req, res) => {
  try {
    const userId = req.userId;
    const purchasedCourses = await PurchaseModel.find({
      userId: userId,
    });

    const purchaseCourseIds = [];
    for (let i = 0; i < purchasedCourses.length; i++) {
      purchaseCourseIds.push(purchasedCourses[i].courseId);
    }

    console.log(purchaseCourseIds);

    const finallyPurchasedCourses = await CourseModel.find({
      _id: { $in: purchaseCourseIds },
    });

    res.json({
      message: "All the purchased courses are",
      finallyPurchasedCourses,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});
courseRouter.get("/preview", async (req, res) => {
  try {
    const allCourseAvailable = await CourseModel.find({});

    res.json({
      message: "The all availabe courses are",
      allCourseAvailable,
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
