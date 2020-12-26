const express = require("express");
const router = express.Router({ mergeParams: true });

// Load authentication function
const checkAuth = require("../../auth/checkAuth");

// Load input validation
const validatePostInput = require("../../validation/post");

// Load User model
const User = require("../../models/userModel");

// @route GET api/user/:userId/post/:postId
// @desc sends post
// @access authenticated user
router.get("/:postId", checkAuth, (req, res, next) => {
  const { userId, postId } = req.params;
  User.findById(userId, (err, user) => {
    if (!err) {
      const selectedPost = user.posts.id(postId);

      selectedPost
        ? res.json(selectedPost)
        : res.status(404).json({ error: "this post doesnt exist" });
    } else {
      next(err);
    }
  });
});

// @route GET api/user/:userId/post/:postId/updated
// @desc sends updated post
// @access authenticated user
router.get("/:postId/updated", checkAuth, (req, res, next) => {
  const { userId, postId } = req.params;

  User.findById(userId, (err, user) => {
    if (!err) {
      const selectedPost = user.posts.id(postId);

      res.json(selectedPost);
    } else {
      next(err);
    }
  });
});

// @route POST api/user/:userId/post/add/new
// @desc saves new post
// @access Authenticated user
router.post("/add/new", checkAuth, (req, res, next) => {
  // Form validation
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { userId } = req.params;
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
});

// @route POST api/user/:userId/post/add/duplicate
// @desc saves new post with duplicate title
// @access Authenticated user
router.post("/add/duplicate", (req, res, next) => {
  // Form validation
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { userId } = req.params;

  User.findById(userId, (err, user) => {
    if (!err) {
      user.posts.push({
        title: req.body.title,
        content: req.body.content,
      });
      user.save((error, user) => (error ? next(error) : res.json(user)));
    } else {
      next(err);
    }
  });
});

// @route PUT api/user/:userId/post/:postId/update
// @desc saves updated post
// @access Authenticated user
router.put("/:postId/update/original", (req, res, next) => {
  // Form validation
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { userId, postId } = req.params;

  User.findById(userId, (err, user) => {
    if (!err) {
      //  check if title exists previously
      const existingPosts = user.posts.filter(
        (existingPost) => existingPost.title === req.body.title
      );

      //  exclude the title of the selected post
      if (existingPosts.length) {
        const check = existingPosts.filter(
          (existingPost) => !existingPost._id.equals(postId)
        );

        if (check.length) {
          res.status(409).json({ error: "This title already exists" });
        } else {
          const previousPost = user.posts.id(postId);
          previousPost.title = req.body.title;
          previousPost.content = req.body.content;

          user.save((error, user) => (error ? next(error) : res.json(user)));
        }
      } else {
        const previousPost = user.posts.id(postId);
        previousPost.title = req.body.title;
        previousPost.content = req.body.content;

        user.save((error, user) =>
          error ? next(error, user) : res.json(user)
        );
      }
    } else {
      next(err);
    }
  });
});

// @route PUT api/user/:userId/post/:postId/update/duplicate
// @desc saves updated post
// @access Authenticated user
router.put("/:postId/update/duplicate", (req, res, next) => {
  // Form validation
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { userId, postId } = req.params;

  User.findById(userId, (err, user) => {
    if (!err) {
      const previousPost = user.posts.id(postId);

      previousPost.title = req.body.title;
      previousPost.content = req.body.content;

      user.save((error, user) => (error ? next(error) : res.json(user)));
    }
  });
});

// @route DELETE api/user/:userId/post/:postId
// @desc delete post
// @access Authenticated user
router.delete("/:postId", (req, res, next) => {
  const { userId, postId } = req.params;

  User.findById(userId, (err, user) => {
    if (!err) {
      const deletedPost = user.posts.id(postId);
      deletedPost.remove();
      user.save((error, user) => (error ? next(error) : res.json(user)));
    } else {
      next(err);
    }
  });
});

module.exports = router;
