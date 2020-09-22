const Trailer = require("../model/trailers");
const Review = require("../model/reviews");
const asyncHandler = require("../middleware/asynchandler");

// @desc      Get Trailers
// @route     GET /api/v1/trailers
// @route     GET /api/v1/reviews/:reviewId/trailers
// @access    Public
exports.getTrailer = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);
  if (review) {
    const trailer = await Trailer.find({ review: req.params.reviewId });
    if (!trailer) {
      return res
        .status(404)
        .json({ msg: `trailer with ${req.params.reviewId} not found` });
    } else {
      res.status(200).json({
        success: true,
        data: trailer,
      });
    }
  } else {
    const trailer = await Trailer.find();
    return res.status(200).json({
      success: true,
      data: trailer,
    });
  }
});

// @desc      Create Trailers
// @route     POST /api/v1/reviews/:reviewId/trailers
// @access    Public
exports.createTrailer = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);
  if (review) {
    req.body.movieTrailer = req.file.path;
    req.body.review = req.params.reviewId;
    const query = await Trailer.create(req.body);
    return res.status(200).json({
      success: true,
      data: query,
    });
  } else {
    return res.status(404).json({
      msg: `Review with id ${req.params.reviewId} not found`,
    });
  }
});
