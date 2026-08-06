const User = require("../models/user");

module.exports.addToWishlist = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(req.user._id);

  if (!user) {
    req.flash("error", "User not found.");
    return res.redirect("/listings");
  }

  if (!user.wishlist.includes(id)) {
    user.wishlist.push(id);
    await user.save();
  }

  req.flash("success", "Listing added to your wishlist.");

  const redirectUrl = req.get("Referrer") || "/listings";
  res.redirect(redirectUrl);
};

module.exports.removeFromWishlist = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndUpdate(req.user._id, {
    $pull: {
      wishlist: id,
    },
  });

  req.flash("success", "Listing removed from your wishlist.");

  const redirectUrl = req.get("Referrer") || "/listings";
  res.redirect(redirectUrl);
};

module.exports.showWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");

  if (!user) {
    req.flash("error", "User not found.");
    return res.redirect("/listings");
  }

  res.render("wishlist/index.ejs", {
    wishlist: user.wishlist,
  });
};