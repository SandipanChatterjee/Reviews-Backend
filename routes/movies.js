const express = require("express");
const router = express.Router({ mergeParams: true });
const storage = require("../middleware/diskstorage");
var multer = require("multer");
var upload = multer({ storage: storage });

const { getMovies, createMovies } = require("../controller/movies");

const rating = require("./rating");

// Re-route into other resource routers
router.use("/:movieId/rating", rating);

router.route("/").get(getMovies).post(upload.array("photos"), createMovies);

module.exports = router;
