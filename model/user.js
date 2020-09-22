const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
var jwt = require("jsonwebtoken");
const userSchema = new schema({
  email: {
    type: String,
    unique: true,
    required: [true, "please enter email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please add confirm password"],
    minlength: 6,
    select: false,
  },
  country: {
    type: String,
    required: [true, "Please enter country"],
  },
  state: {
    type: String,
    required: [true, "Please enter state"],
  },
  city: {
    type: String,
    required: [true, "Please enter city"],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//encrypt password || hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = await bcrypt.hash(this.password, salt);
});

//initialize login/register token
userSchema.methods.getToken = function () {
  return jwt.sign({ id: this._id }, "shhhhh");
};

//check user entered-password with hashed-password
userSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//set hased reset-password token
userSchema.methods.getPasswordToken = async function () {
  //set reset-password token
  const token = crypto.randomBytes(20).toString("hex");
  //hash the password and assign to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return token;
};

module.exports = mongoose.model("User", userSchema);
