const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("dotenv").config();

const mongoose = require("mongoose");
const Review = require("../models/review");
const User = require("../models/user");
const Listing = require("../models/listing");

const MONGO_URL = process.env.ATLASDB_URL;

async function main() {
  if (!MONGO_URL) {
    throw new Error("ATLASDB_URL is not defined in .env file!");
  }
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Connected to MongoDB Atlas for database wipe...");
    clearDB();
  })
  .catch((err) => console.error("Connection Error:", err.message));

async function clearDB() {
  try {
    await Review.deleteMany({});
    await Listing.deleteMany({});
    await User.deleteMany({});

    console.log("Users, Listings & Reviews Cleared Successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error clearing database:", err);
    mongoose.connection.close();
  }
}