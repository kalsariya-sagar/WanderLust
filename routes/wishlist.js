const express = require("express");
const wishlistController = require("../controllers/wishlist");
const { isLoggedIn } = require("../middlewares");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();


router.get("/", isLoggedIn, wrapAsync(wishlistController.showWishlist));

router.post("/:id", isLoggedIn, wrapAsync(wishlistController.addToWishlist));

router.delete("/:id", isLoggedIn, wrapAsync(wishlistController.removeFromWishlist));

module.exports = router;