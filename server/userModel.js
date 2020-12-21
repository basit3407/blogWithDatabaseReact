const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const postSchema = {
  title: String,
  content: String,
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name."],
  },
  username: {
    type: String,
    // eslint-disable-next-line no-useless-escape
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Invalid email format"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
  },
  googleId: String,
  facebookId: String,
  secret: String,
  posts: [postSchema],
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

module.exports = User;
