const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { connect } = require("./config/dbConfig");
const app = express();

connect();
app.use(cookieParser("ThisIsTheStringToParseTheCookies"));
app.use(
  session({
    name: "newSession",
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: false,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.end("Hello World");
});

app.use("/auth", require("./routes/authRoute"));
app.use("/user", require("./routes/api/userRoute"));
// app.use("/movie", require("./routes/api/movieRoute"));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const PORT = process.env.PORT || 8010;

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log("Listening to port " + PORT);
  });
});
