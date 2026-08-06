const express = require("express");
const upload = require("../cloudConfig/multer");
const listingController = require("../controllers/listings");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();


router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );


router.get("/search", wrapAsync(listingController.searchListings));


router.get("/new", isLoggedIn, listingController.renderNewForm);


router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );


router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;