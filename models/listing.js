const mongoose = require("mongoose");
const Review = require("./review");
const categories = require("../utils/categories");

const { Schema } = mongoose;

const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60";

const categoryNames = categories.map((category) => category.name);

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    image: {
      filename: {
        type: String,
        default: "listingimage",
      },

      url: {
        type: String,
        default: DEFAULT_IMAGE_URL,
        set: (value) => (value === "" ? DEFAULT_IMAGE_URL : value),
      },
    },

    price: {
      type: Number,
      min: 0,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        default: [72.8777, 19.076], 
      },
    },

    category: {
      type: String,
      enum: categoryNames,
      default: "Trending",
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

listingSchema.post("findOneAndDelete", async (listing) => {
  if (!listing) return;

  await Review.deleteMany({
    _id: {
      $in: listing.reviews,
    },
  });
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;