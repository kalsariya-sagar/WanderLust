if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");

const mongoose = require("mongoose");

const path = require("path");

const methodOverride = require("method-override");

const ejsMate = require("ejs-mate");

const session = require("express-session");

const MongoStore = require("connect-mongo").default;

const flash = require("connect-flash");

const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/user");

const ExpressError = require("./utils/ExpressError");

const listingRouter = require("./routes/listings");

const reviewRouter = require("./routes/reviews");

const userRouter = require("./routes/users");

const wishlistRouter = require("./routes/wishlist");

const app = express();

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })

  .catch((err) => {
    console.error("Database Connection Error:", err);
  });

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,

  touchAfter: 24 * 3600,

  crypto: {
    secret: process.env.SECRET || "thisshouldbeabettersecret",
  },
});

store.on("error", (err) => {
  console.log("Mongo Session Store Error:", err);
});

const sessionOptions = {
  store,

  secret: process.env.SECRET || "thisshouldbeabettersecret",

  resave: false,

  saveUninitialized: false,

  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),

    maxAge: 7 * 24 * 60 * 60 * 1000,

    httpOnly: true,
  },
};

app.use(session(sessionOptions));

app.use(flash());

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");

  res.locals.error = req.flash("error");

  res.locals.currUser = req.user;

  next();
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/", userRouter);

app.use("/listings", listingRouter);

app.use("/listings/:id/reviews", reviewRouter);

app.use("/wishlist", wishlistRouter);

// Privacy Policy Route

app.get("/privacy", (req, res) => {
  res.render("privacy.ejs");
});

// Terms & Conditions Route

app.get("/terms", (req, res) => {
  res.render("terms.ejs");
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;

  if (!err.message) err.message = "Something Went Wrong!";

  res.status(statusCode).render("error.ejs", { err });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
