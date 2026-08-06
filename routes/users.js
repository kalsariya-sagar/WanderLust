const express = require("express");
const passport = require("passport");
const userController = require("../controllers/users");
const { saveRedirectUrl } = require("../middlewares");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();


router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));


router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );


router.get("/logout", userController.logout);

module.exports = router;