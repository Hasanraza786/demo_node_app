const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const postsRoute = require("./routes/posts");

app.use(bodyParser.json());
app.use("/posts", postsRoute);

//Routes
app.get("/", (req, res) => {
  try {
    res.send("This is My world");
  } catch (error) {}
});

//COnnect to db
mongoose.connect(process.env.DB_URL);

// app.use((err, req, res, next) => {
//   console.log("akjdbjasbdas", err);
//   return res.json({
//     status: err.statusCode || 400,
//     message: err
//   });
// });

// Strat to listening the app
app.listen(3000);
