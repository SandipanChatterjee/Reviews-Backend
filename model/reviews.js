const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  movieTitle: {
    type: String,
    required: [true, "Please add a title"],
  },
  rating: {
    type: Number,
    required: [true, "Please enter rating"],
  },
  movieImg: String,
});

module.exports = mongoose.model("Review", reviewSchema);
