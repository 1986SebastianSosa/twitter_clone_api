const mongoose = require("mongoose");
const dbInitialSetup = require("./seeders/dbInitialSetup");

const mongooseConnection = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1/twitter_clone", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.log("There was an error: ", err);
    });
  // dbInitialSetup();
};

mongooseConnection();
