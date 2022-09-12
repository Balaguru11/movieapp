const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { connect } = require("./config/dbConfig");
const MemoryStore = require("memorystore")(session);

const app = express();

connect();
app.use(cookieParser("ThisIsTheStringToParseTheCookies"));
app.use(
  session({
    name: "newSession",
    secret: "expressSessionForAssessment2022",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hello World");
  res.end();
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
