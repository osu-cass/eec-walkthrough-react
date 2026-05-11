// File: index.js
// Description: handles all API routing

const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
// const apiContentSecurityPolicy = [
//   "default-src 'none'",
//   "base-uri 'none'",
//   "form-action 'none'",
//   "frame-ancestors 'none'",
//   "object-src 'none'"
// ].join("; ");

// check that JSON body is valid
app.use((req, res, next) => {
  bodyParser.json()(req, res, err => {
    if (err) {
      console.error("400: Invalid JSON request body");
      res.status(400).send({error: "400: Invalid JSON request body"});
    } else {
      next();
    }
  });
});

// general middleware
app.use(logger("dev"));
// app.use((req, res, next) => {
//   res.setHeader("Content-Security-Policy", apiContentSecurityPolicy);
//   next();
// });
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// handle api requests
app.use("/api/files", require("./files"));
app.use("/api/cards", require("./cards"));
app.use("/api/headers", require("./headers"));
app.use("/api/home", require("./home"));
app.use("/api/icons", require("./icons"));
app.use("/api/links", require("./links"));
app.use("/api/requests", require("./requests"));
app.use("/api/pages", require("./pages"));
app.use("/api/users", require("./users"));
app.use("/api/categories", require("./categories"));
app.use("/api/views", require("./views"));
app.use("/api/sources", require("./sources"));
app.use("/api/notifications", require("./notifications"));
app.use("/api/info", require("./info"));
app.use("/api/contributors", require("./contributors"));
app.use("/api/banners", require("./banners"));
app.use("/api/quizzes", require("./quizzes"));
app.use("/api/curators", require("./curators"));
app.use("/api/training", require("./trainingPages"));

// unhandled API requests get a 404 error
app.all("/api/*", (req, res) => {
  console.error("404: File not found\n");
  res.status(404).send({error: "Not Found"});
});

module.exports = app;