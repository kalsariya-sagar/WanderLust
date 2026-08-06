const express = require("express");
const reviewController = require("../controllers/reviews");
const { isLoggedIn, isReviewAuthor, validateReview } = require("../middlewares");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });


router.route("/").post(
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);


router.route("/:reviewId").delete(
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;