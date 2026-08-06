const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("dotenv").config();
const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");
const User = require("../models/user");

const MONGO_URL = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
    initDB();
  })
  .catch((err) => {
    console.error("Database Connection Error:", err);
  });

const initDB = async () => {
  try {
    // Delete existing listings
    await Listing.deleteMany({});

    // Create or reuse demo owner user
    let demoUser = await User.findOne({ username: "kalsariya sagar" });

    if (!demoUser) {
      demoUser = new User({
        email: "sagar@gmail.com",
        username: "kalsariya sagar",
      });
      await User.register(demoUser, "12345678");
      console.log("Demo user created successfully!");
    } else {
      console.log("Demo user already exists.");
    }

    // Attach owner ID to each sample listing
    const listings = initData.data.map((obj) => ({
      ...obj,
      owner: demoUser._id,
    }));

    await Listing.insertMany(listings);
    console.log("Database initialized with sample listings!");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error initializing database:", err);
    mongoose.connection.close();
  }
};