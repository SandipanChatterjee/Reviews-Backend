const express = require("express");
const router = express.Router({ mergeParams: true });
const storage = require("../middleware/diskStorage");
var multer = require("multer");
var upload = multer({ storage: storage });

const { getMovies, createMovies } = require("../controller/movies");

/*const field = [
  {
    name: "photos",
    maxCount: 12,
  },
  {
    name: "members",
    maxCount: 1,
  },
];*/

router.route("/").get(getMovies).post(upload.array("photos"), createMovies);

// router.route("/:id").get(getMovie).put(updateMovie).delete(deleteMovie);

module.exports = router;
