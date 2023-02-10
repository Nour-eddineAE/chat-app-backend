require("dotenv").config();
const app = require("express")();

require("./start/logging")(app);
require("./start/db-connection")();
require("./start/validation")();
require("./start/routes")(app);
if (process.env.NODE_ENV === "production") require("./start/prod")(app);
if (process.env.NODE_ENV !== "test") require("./start/server")(app);

exports.app = app;
