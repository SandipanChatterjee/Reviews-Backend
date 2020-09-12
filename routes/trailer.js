const express = require("express");
const router = express.Router({ mergeParams: true });
const storage = require("../middleware/diskStorage");

var multer = require("multer");
var upload = multer({ storage: storage });

const { createTrailer } = require("../controller/trailers");

router.route("/").post(upload.single("movieTrailer"), createTrailer);

module.exports = router;
