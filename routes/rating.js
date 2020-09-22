const express = require("express");
const router = express.Router({ mergeParams: true });
const { protect } = require("../middleware/auth");
const { createRating, getRating } = require("../controller/rating");

router.route("/").post(protect, createRating).get(protect, getRating);

module.exports = router;
