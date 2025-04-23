const jwt = require("jsonwebtoken");
const authAdmin = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new Error("The token was not found");

    const isTokenValid = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

    if (!isTokenValid) throw new Error("the token is not valid!");

    const decodedId = isTokenValid.id;
    req.adminId = decodedId;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
};

module.exports = {
  authAdmin,
};
