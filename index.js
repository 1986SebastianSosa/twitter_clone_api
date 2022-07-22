const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("bienvenido a twitter");
});

app.listen(8000, () => console.log("Serving on port 8000"));
