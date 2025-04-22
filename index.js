const express = require("express");
const app = express();
require("dotenv").config();
const { ConnectDB } = require("./config/databaseConnection");
const { UserModel } = require("./models/userModel");
const bcrypt = require("bcrypt");
const { validatingUserInfo } = require("./utils/Validation");
const jwt = require("jsonwebtoken");
app.use(express.json());
const cookieParser = require("cookie-parser");
const { authUser } = require("./middlewares/authUser");
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    //validating the user details
    const isValidDetails = validatingUserInfo(req.body);
    if (!isValidDetails) throw new Error(isValidDetails);

    //after the uservalidation successful
    const { firstName, lastName, emailId, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
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

app.post("/signin", async (req, res) => {
  const emailId = req.body.emailId;
  const password = req.body.password;
  try {
    const user = await UserModel.findOne({
      emailId,
    });
    if (!user) throw new Error("No user found with this emailId");

    const isValidPassword = bcrypt.compare(password, user.password);

    if (!isValidPassword) throw new Error("Password is Incorrect");

    //if the login is succesful then generate the token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );
    res.cookie("token", token);
    res.json({
      message: "User Loggin Successful!",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

app.get("/userinfo", authUser, (req, res) => {
  try {
    res.json({
      data: req.user,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

app.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.json({
      message: "User Logout Successful",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

app.get("/getUser", (req, res) => {});
ConnectDB().then(() => {
  console.log("Data Base Connected ✅");
  app.listen(process.env.PORT, () => {
    console.log("App is Listened ✅");
  });
});
