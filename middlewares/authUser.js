const { UserModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new Error("The token is Invalid ");
  const isTokenValid = jwt.verify(token, process.env.JWT_SECRET);
  if (!isTokenValid) throw new Error("The token is not valid");

  //if everything was fine then,
  const decodedId = isTokenValid.id;
  req.userId = decodedId;
  next();
};
module.exports = {
  authUser,
};
