const express = require("express");
const router = express.Router();
const storage = require("../middleware/diskstorage");

var multer = require("multer");
var upload = multer({ storage: storage });

const {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controller/reviews");

const movies = require("./movies");
const trailer = require("./trailer");

const { protect } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:reviewId/movies", movies);
router.use("/:reviewId/trailers", trailer);

router.route("/").get(getReviews).post(upload.single("movieImg"), createReview);

router
  .route("/:id")
  .get(getReview)
  .put(upload.single("movieImg"), updateReview)
  .delete(deleteReview);

module.exports = router;
