const Review = require("../model/reviews");
const Movies = require("../model/movies");
const asyncHandler = require("../middleware/asynchandler");
const members = require("../data/members.json");

// @desc      Get Movies
// @route     GET /api/v1/movies
// @route     GET /api/v1/reviews/:reviewId/movies
// @access    Public
exports.getMovies = asyncHandler(async (req, res, next) => {
  console.log("reviewID###", req.params.reviewId);
  let query;
  if (req.params.reviewId) {
    query = await Movies.find({ review: req.params.reviewId });
    res.status(200).json({
      success: true,
      data: query,
    });
  } else {
    query = await Movies.find();
    res.status(200).json({
      success: true,
      data: query,
    });
  }
});

// @desc      Create Movie
// @route     POST reviews/reviews/:reviewId/movie
// @access    Private
exports.createMovies = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review) {
    return next(
      res.status(404).json({
        success: true,
        msg: `Movie with id ${req.params.id} not found`,
      })
    );
  }
  req.body.dateOfRelease = Date(req.body.dateOfRelease);
  req.body.photos = req.files.map((el) => el.path);
  req.body.members = members;
  req.body.review = req.params.reviewId;
  console.log(req.body.dateOfRelease);
  const query = await Movies.create(req.body);
  if (!query) {
    return next(
      res.status(400).json({ msg: "Movie details cannot be created." })
    );
  }
  res.status(200).json({ success: true, data: query });
});
