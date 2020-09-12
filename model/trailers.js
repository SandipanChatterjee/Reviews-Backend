const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const trailerSchema = new Schema({
  movieTrailer: String,
});

module.exports = mongoose.model("trailer", trailerSchema);
