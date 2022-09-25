const mongoose = require("mongoose");
const dbInitialSetup = require("./seeders/dbInitialSetup");

const mongooseConnection = async () => {
  await mongoose
    .connect(
      "mongodb+srv://SebastianSosa:s41407532@cluster0.coqn4la.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.log("There was an error: ", err);
    });
  // dbInitialSetup();
};

mongooseConnection();
