const mongoose = require("mongoose");
const dbInitialSetup = require("./seeders/dbInitialSetup");

const mongooseConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // dbInitialSetup();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("There was an error: ", err);
  }
};

mongooseConnection();
