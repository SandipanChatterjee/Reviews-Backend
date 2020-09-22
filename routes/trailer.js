const express = require("express");
const router = express.Router({ mergeParams: true });
const storage = require("../middleware/diskstorage");

var multer = require("multer");
var upload = multer({ storage: storage });

const { createTrailer, getTrailer } = require("../controller/trailers");

router
  .route("/")
  .get(getTrailer)
  .post(upload.single("movieTrailer"), createTrailer);

module.exports = router;
