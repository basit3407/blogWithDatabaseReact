// Load User model
const User = require("../models/userModel");

module.exports = function addPost(userId, req, res, next) {
  User.findById(userId, (err, user) => {
    if (!err) {
      //   check if post title exsists or not.
      const existingPosts = user.posts.find(
        (existingPost) => existingPost.title === req.body.title
      );

      if (existingPosts) {
        res.status(409).json({ error: "This post title already existis" });
      } else {
        user.posts.push({ title: req.body.title, content: req.body.content });
        user.save((error, user) => (err ? next(error) : res.json(user.posts)));
      }
    } else {
      next(err);
    }
  });
};
