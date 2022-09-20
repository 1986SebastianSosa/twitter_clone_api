const mongoose = require("mongoose");
const dbInitialSetup = require("./seeders/dbInitialSetup");

const mongooseConnection = async () => {
  await mongoose
    .connect(process.env.DB_URI, {
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
