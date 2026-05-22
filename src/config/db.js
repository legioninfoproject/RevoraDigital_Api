const mongoose = require("mongoose");
const config = require("./config");

const db = new Object();

db.establishConnection = async () => {
  try {
    await mongoose.connect(config.dataBase.url);

    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};

module.exports = db;