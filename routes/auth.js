const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controller/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;
