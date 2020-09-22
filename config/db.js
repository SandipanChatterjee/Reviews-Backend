const mongoose = require("mongoose");

const mongoDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://Sandipan123:LGMSj1PPpsHmb6Ca@cluster0.prv4y.mongodb.net/reviews",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log(conn.connection.host);
};

module.exports = mongoDB;
