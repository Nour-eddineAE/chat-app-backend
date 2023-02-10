require("dotenv").config();
const config = require("config");
const mongoose = require("mongoose");
const logger = require("../logs/logger");

mongoose.set("strictQuery", false);

module.exports = async function connect() {
  const db = config.get("DB_URL");
  return await mongoose.connect(db, { useUnifiedTopology: true }).then(() => {
    logger.info(`Connected to db ${db} successfully...`);
  });
};
