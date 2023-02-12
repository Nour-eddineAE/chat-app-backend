const messages = require("../routes/messages");
const users = require("../routes/users");
const express = require("express");
const cors = require("cors");
const serverErrorHandler = require("../middlewares/error");

module.exports = (app) => {
  // enable request body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use("/api/messages", messages);
  app.use("/api/users", users);

  // To be used after route handlers
  app.use(serverErrorHandler);
};
