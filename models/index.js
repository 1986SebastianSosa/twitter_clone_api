const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/twitter_clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("There was an error: ", err);
  });
