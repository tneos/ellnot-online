const fs = require("fs"); // Read json file
const dotenv = require("dotenv"); // ENV variables in order to connect to DB
const connectDB = require("../../../config/db");
const mongoose = require("mongoose");
const Clothing = require("../../../models/Clothing");
const Shoes_Accesories = require("../../../models/Shoes_Accessories");
const Summer_Collection = require("../../../models/Summer_Collection");
const User = require("../../../models/User");

dotenv.config({path: "./config.env"});

// Connect to Database
connectDB();

// Read JSON file
const clothing = JSON.parse(fs.readFileSync(`${__dirname}/clothing.json`, "utf-8"));
const shoes_accessories = JSON.parse(
  fs.readFileSync(`${__dirname}/shoes_accessories.json`, "utf-8")
);
const summer_collection = JSON.parse(
  fs.readFileSync(`${__dirname}/summer_collection.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Clothing.create(clothing);
    await Shoes_Accesories.create(shoes_accessories);
    await Summer_Collection.create(summer_collection);
    console.log("Data successfully loaded.");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM COLECTION
const deleteData = async () => {
  try {
    // await User.deleteMany();
    await Clothing.deleteMany();
    await Shoes_Accesories.deleteMany();
    await Summer_Collection.deleteMany();
    console.log("All data successfully deleted.");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
