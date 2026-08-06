const Listing = require("../models/listing");
const User = require("../models/user");
const { cloudinary } = require("../cloudConfig/cloudConfig");
const categories = require("../utils/categories");
const ExpressError = require("../utils/ExpressError");
const getCoordinates = require("../utils/geocoder");

const getUserWishlist = async (reqUser) => {
  if (!reqUser) return [];
  const user = await User.findById(reqUser._id);
  return user ? user.wishlist.map((id) => id.toString()) : [];
};

module.exports.index = async (req, res) => {
  const { category } = req.query;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  const allListings = await Listing.find(filter);
  const wishlist = await getUserWishlist(req.user);

  res.render("listings/index.ejs", {
    allListings,
    categories,
    selectedCategory: category || "",
    noResults: null,
    q: "",
    wishlist,
  });
};

module.exports.searchListings = async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === "") {
    req.flash("error", "Please enter something to search.");
    return res.redirect("/listings");
  }

  const regex = new RegExp(q, "i");

  const allListings = await Listing.find({
    $or: [
      { title: regex },
      { location: regex },
      { country: regex },
    ],
  });

  const wishlist = await getUserWishlist(req.user);
  const noResults = allListings.length === 0 ? "No listings found matching your search." : null;

  res.render("listings/index.ejs", {
    allListings,
    categories,
    selectedCategory: "",
    noResults,
    q,
    wishlist,
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs", {
    categories,
    selectedCategory: "",
  });
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing You Requested Does Not Exist!");
    return res.redirect("/listings");
  }

  const wishlist = await getUserWishlist(req.user);

  res.render("listings/show.ejs", {
    listing,
    wishlist,
  });
};

module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  // Fetch coordinates using geocoder utility
  const coordinates = await getCoordinates(newListing.location);
  if (coordinates) {
    newListing.geometry = {
      type: "Point",
      coordinates: [coordinates.longitude, coordinates.latitude],
    };
  }

  // Handle Cloudinary Image Upload
  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await newListing.save();

  req.flash("success", "New Listing Created Successfully!");
  res.redirect(`/listings/${newListing._id}`);
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing You Requested Does Not Exist!");
    return res.redirect("/listings");
  }

  res.render("listings/edit.ejs", {
    listing,
    categories,
    selectedCategory: listing.category || "",
  });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  if (!listing) {
    req.flash("error", "Listing You Requested Does Not Exist!");
    return res.redirect("/listings");
  }

  // Re-fetch coordinates if location was modified
  const coordinates = await getCoordinates(req.body.listing.location);
  if (coordinates) {
    listing.geometry = {
      type: "Point",
      coordinates: [coordinates.longitude, coordinates.latitude],
    };
  }

  // Replace Cloudinary image if a new image file is uploaded
  if (req.file) {
    if (
      listing.image &&
      listing.image.filename &&
      listing.image.filename !== "listingimage"
    ) {
      await cloudinary.uploader.destroy(listing.image.filename);
    }

    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await listing.save();

  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing You Requested Does Not Exist!");
    return res.redirect("/listings");
  }

  // Delete image from Cloudinary storage
  if (
    listing.image &&
    listing.image.filename &&
    listing.image.filename !== "listingimage"
  ) {
    await cloudinary.uploader.destroy(listing.image.filename);
  }

  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/listings");
};