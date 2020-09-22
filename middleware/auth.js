const User = require("../model/user");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("./errorhandler");
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return ErrorHandler("Token not valid", res, next);
  }

  //check token is valid or not
  try {
    const decode = jwt.verify(token, "shhhhh");
    console.log("decode->", decode);
    req.user = await User.findById(decode.id);
    next();
  } catch (e) {
    return ErrorHandler("Not authorized to access routes", res, next);
  }
};
