const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
process.env.SUPPRESS_NO_CONFIG_WARNING = "y";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
