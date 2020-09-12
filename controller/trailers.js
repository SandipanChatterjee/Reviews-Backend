const Trailer = require("../model/trailers");
const Review = require("../model/reviews");

// @desc      Get Trailers
// @route     GET /api/v1/trailers
// @route     GET /api/v1/reviews/:reviewId/trailers
// @access    Public
exports.createTrailer = async (req, res, next) => {
  console.log("reviewID###", req.params.reviewId);
  console.log("files ##", req.file);
  const review = await Review.findById(req.params.reviewId);
  if (review) {
    req.body.movieTrailer = req.file.path;
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
};
