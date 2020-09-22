const Reviews = require("../model/reviews");
const asyncHandler = require("../middleware/asynchandler");

// @desc      Get Movies
// @route     GET /reviews/movies
// @access    Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  const query = await Reviews.find();
  res.status(200).json({ success: true, data: query });
});

// @desc      Get Movie by id
// @route     GET /reviews/movies/:id
// @access    Private
exports.getReview = asyncHandler(async (req, res, next) => {
  const query = await Reviews.findById(req.params.id);
  if (!query) {
    return next(
      res.status(404).json({
        success: true,
        msg: `Review with id ${req.params.id} not found`,
      })
    );
  }
  res.status(200).json({ success: true, data: query });
});

// @desc      Create Movie
// @route     POST /reviews/movies
// @access    Private
exports.createReview = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  req.body.movieImg = req.file.path;
  const query = await Reviews.create(req.body);

  if (!query) {
    return next(res.status(400).json({ msg: "Review cannot be created." }));
  }
  res.status(200).json({ success: true, data: query });
});

// @desc      Update Movie
// @route     UPDATE /reviews/movies:id
// @access    Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let query = await Reviews.findById(req.params.id);

  if (!query) {
    return next(
      res.status(404).json({
        success: true,
        msg: `Review with id ${req.params.id} not found`,
      })
    );
  }
  console.log("req.body ####", req.body);
  if (req.file) {
    req.body.movieImg = req.file.path;
  }
  query = await Reviews.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({ success: true, data: query });
});

// @desc      Delete Movie
// @route     DELETE /reviews/movies:id
// @access    Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const query = await Reviews.findById(req.params.id);

  if (!query) {
    return next(res.status(400).json({ msg: "Review not found" }));
  }

  await query.remove();

  res.status(200).json({ success: true, data: {} });
});
