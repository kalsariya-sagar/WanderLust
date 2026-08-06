const mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

if (passportLocalMongoose.default) {
  passportLocalMongoose = passportLocalMongoose.default;
}

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;