const mongoose = require("mongoose");

const {MONGO_URI} = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Error connecting to db", error);
    process.exit(1);
  }
};

module.exports = connectDB