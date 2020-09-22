const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  movieName: String,
  rating: {
    type: Number,
    min: [0, "Rating cannot be less than 0."],
    max: [10, "Rating cannot be more than 10"],
    required: [true, "Please enter rating"],
  },
  // userCount: Number,
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: "Movies",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

RatingSchema.index({ user: 1 });

RatingSchema.statics.rating = async function (movieId) {
  const obj = await this.aggregate([
    { $match: { movie: movieId } },
    {
      $group: {
        _id: "$movie",
        averageRating: {
          $avg: "$rating",
        },
        // usersRated: {
        //   $sum: "$userCount" + 1,
        // },
      },
    },
  ]);
  console.log("obj#", obj);
  try {
    await this.model("Movies").findByIdAndUpdate(movieId, {
      averageRating: obj[0].averageRating.toFixed(2),
    });
  } catch (e) {
    console.log(e.message);
  }
};

RatingSchema.post("save", function () {
  this.constructor.rating(this.movie);
});

RatingSchema.pre("remove", function () {
  this.constructor.rating(this.movie);
});

module.exports = mongoose.model("Rating", RatingSchema);
