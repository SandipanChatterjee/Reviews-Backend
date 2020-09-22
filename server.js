const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorhandler");
var cors = require("cors");
const cookieParser = require("cookie-parser");
//mongodb
const connectDB = require("./config/db");
connectDB();

//Route files
const reviews = require("./routes/reviews");
const movies = require("./routes/movies");
const trailer = require("./routes/trailer");
const auth = require("./routes/auth");
const location = require("./routes/location");
const rating = require("./routes/rating");
// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

//cookie parse
app.use(cookieParser());

//Body parse
app.use(express.json());

//make uploads folder public
app.use("/uploads", express.static("uploads"));

//CORS
app.use(cors());

//Mount routes
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/movies", movies);
app.use("/api/v1/trailers", trailer);
app.use("/api/v1/auth", auth);
app.use("/api/v1/location", location);
app.use("/api/v1/rating", rating);

//errorHandler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  server.close(() => process.exit(1));
});
