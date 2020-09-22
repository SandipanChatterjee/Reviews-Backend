const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const trailerSchema = new Schema({
  movieTrailer: String,
  review: {
    type: mongoose.Schema.ObjectId,
    ref: "Review",
    required: true,
  },
});

module.exports = mongoose.model("trailer", trailerSchema);
