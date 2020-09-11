const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorhandler");
//mongodb
const connectDB = require("./config/db");
connectDB();

//Route files
const reviews = require("./routes/reviews");
const movies = require("./routes/movies");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

//Body parse
app.use(express.json());

//make uploads folder public
app.use("/uploads", express.static("uploads"));

//Mount routes
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/movies", movies);

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
