const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { ConnectDB } = require("./config/databaseConnection");
const { authRouter } = require("./routes/authRouter");

const { courseRouter } = require("./routes/courseRouter");
const { adminRouter } = require("./routes/adminRouter");
require("dotenv").config();

app.use(express.json()); //middleware for reading json body
app.use(cookieParser()); //middleware for reading cookies

app.use("/api/v1/user", authRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

app.get("/getUser", (req, res) => {});
ConnectDB().then(() => {
  console.log("Data Base Connected ✅");
  app.listen(process.env.PORT, () => {
    console.log("App is Listened ✅");
  });
});
