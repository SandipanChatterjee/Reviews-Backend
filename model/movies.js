const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please enter title"],
  },
  genre: {
    type: [],
    required: [true, "Please enter genre"],
  },
  runtime: {
    type: String,
    required: [true, "Please enter runtime"],
  },
  story: {
    type: String,
    required: [true, "Please enter story"],
  },
  photos: [],
  members: {},
  review: {
    type: mongoose.Schema.ObjectId,
    ref: "Review",
    required: true,
  },
});

module.exports = mongoose.model("Movies", MoviesSchema);
