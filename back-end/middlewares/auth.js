const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
require("dotenv").config();

const checkUseAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    req.flash("error", "Unauthorized user, please login.");
    return res.redirect("/login");
  }

  try {
    const verifyLogin = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(verifyLogin.ID);

    if (!user) {
      req.flash("error", "User not found. Please login again.");
      return res.redirect("/login");
    }

    req.userdata = user;  // Attach user details to req.userdata
    next(); // Proceed to next middleware or route handler
  } catch (err) {
    console.error("Token verification failed:", err);
    req.flash("error", "Invalid token. Please login again.");
    res.redirect("/login");
  }
};

module.exports = checkUseAuth;
