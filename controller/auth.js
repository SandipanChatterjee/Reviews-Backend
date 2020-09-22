const User = require("../model/user");
const asyncHandler = require("../middleware/asynchandler");
const ErrorHandler = require("../middleware/errorhandler");
const NodeMailerHandler = require("../utils");
const crypto = require("crypto");

exports.register = asyncHandler(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return ErrorHandler("Password does not match", res, next);
  }
  const query = await User.create(req.body);
  if (!query) {
    return ErrorHandler("Account exists", res, next);
  }
  sendResponseToken(query, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return ErrorHandler("Please provide email or password", res, next);
  }

  //check for email
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return ErrorHandler("User not found", res, next);
  }

  //check for password
  const isMatch = await user.checkPassword(password);
  if (!isMatch) {
    return ErrorHandler("Password invalid", res, next);
  }

  sendResponseToken(user, 200, res);
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  //check if email exists
  const user = await User.findOne({ email: email });
  if (!user) {
    return ErrorHandler("Email not found.", res, next);
  }

  const resetToken = await user.getPasswordToken();

  await user.save({ validateBeforeSave: false });
  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  res.status(200).json({
    message: "Success",
    data: user,
  });

  try {
    const mailSent = await NodeMailerHandler({
      email: user.email,
      subject: "Password reset token",
      message,
    });
    if (mailSent) {
      res.status(200).json({
        message: `Mail sent to ${user.email}`,
      });
    }
  } catch (e) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
  }
});

//url = api/v1/auth/resetpassword/:resetpasswordtoken - not working
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return ErrorHandler("Invalid token", res, next);
  }

  const { password } = req.body;
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null);
  res.status(200).json({
    success: true,
    data: {},
  });
});

const sendResponseToken = (user, statusCode, res) => {
  const token = user.getToken();
  res.status(statusCode).cookie("token", token).json({
    success: true,
    data: user,
    token,
  });
};
