const Movies = require("../model/movies");
const Rating = require("../model/rating");
const asyncHandler = require("../middleware/asynchandler");
const ErrorHandler = require("../middleware/errorhandler");

exports.getRating = asyncHandler(async (req, res, next) => {
  let query;
  //copy req.query
  const reqQuery = { ...req.query };
  //create query string
  const queryStr = JSON.stringify(reqQuery);
  //removie query fields
  const removeFields = ["select", "sort"];
  //loop over query fields and remove query
  removeFields.forEach((el) => delete reqQuery[el]);
  //find resources
  query = Rating.find(JSON.parse(queryStr));
  //select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  // Executing query
  const results = await query;

  if (!results) {
    return ErrorHandler("Error", res, next);
  }

  // console.log("results #", results);
  res.status(200).json({
    success: true,
    data: results,
  });
});

exports.createRating = asyncHandler(async (req, res, next) => {
  const movie = await Movies.findById(req.params.movieId);
  if (!movie) {
    return ErrorHandler("Movie not found", res, next);
  }
  req.body.movieName = movie.title;
  req.body.movie = req.params.movieId;
  req.body.user = req.user.id;
  let query;
  try {
    query = await Rating.create(req.body);
  } catch (e) {
    return ErrorHandler(e.message, res, next);
  }

  res.status(200).json({
    success: true,
    data: query,
  });
});
