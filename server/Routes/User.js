import express from "express";
const router = express.Router();

import User from "../App";

//Home page for user with all the posts;
router.get("/:_id/home", (req, res, next) => {
  const userId = req.params._id;

  User.findById(userId, (err, user) => (!err ? res.json(user) : next(err)));
});

//Dedicated page for each post
router.get("/:_id/posts/:postId", (req, res, next) => {
  const userId = req.params._id;
  const postId = req.params.postId;

  User.findById(userId, (err, user) => {
    if (!err) {
      const selectedPost = user.posts.id(postId);

      selectedPost
        ? res.json(selectedPost)
        : res.status(404).json({ error: "this post title doesnt exist" });
    } else {
      next(err);
    }
  });
});

// Sending updated Post
router.get("/:_id/posts/:postId/updated", (req, res, next) => {
  const userId = req.params._id;
  const postId = req.params.postId;

  User.findById(userId, (err, user) => {
    if (!err) {
      const selectedPost = user.posts.id(postId);

      res.json(selectedPost);
    } else {
      next(err);
    }
  });
});

//Adding New post
router.post("/:_id/add/new", (req, res, next) => {
  const newPost = req.body;
  const userId = req.params._id;

  User.findById(userId, (err, user) => {
    if (!err) {
      //   check if post title exsists or not.
      const existingPosts = user.posts.find(
        (existingPost) => existingPost.title === newPost.title
      );

      if (existingPosts) {
        res.status(409).json({ error: "This post title already existis" });
      } else {
        user.posts.push({ title: newPost.title, content: newPost.content });
        user.save((error) =>
          err ? next(error) : res.json("Post added sucessfully")
        );
      }
    } else {
      next(err);
    }
  });
});

// Adding Post with duplicate title
router.post("/:_id/home/add/uplicate", (req, res, next) => {
  const duplicatePost = req.body;
  const userId = req.params._id;

  User.findById(userId, (err, user) => {
    if (!err) {
      user.posts.push({
        title: duplicatePost.title,
        content: duplicatePost.content,
      });
      user.save((error) =>
        error ? next(error) : res.json("duplicate post added")
      );
    } else {
      next(err);
    }
  });
});

// Updating Post
router.put("/:_id/home/posts/update", (req, res, next) => {
  const userId = req.params._id;
  const updatedPost = req.body;

  User.findById(userId, (err, user) => {
    if (!err) {
      //  check if title exists previously
      const existingPosts = user.posts.filter(
        (existingPost) => existingPost.title === updatedPost.title
      );
      //  exclude the title of the selected post
      if (existingPosts.length) {
        const check = existingPosts.filter(
          (existingPost) => !existingPost._id.equals(updatedPost._id)
        );
        if (check.length) {
          res.status(409).json({ error: "This title already exists" });
        } else {
          const previousPost = user.posts.id(updatedPost._id);
          previousPost.title = updatedPost.title;
          previousPost.content = updatedPost.content;

          user.save((error) =>
            error ? next(error) : res.json("post updated successfully")
          );
        }
      } else {
        const previousPost = user.posts.id(updatedPost._id);
        previousPost.title = updatedPost.title;
        previousPost.content = updatedPost.content;

        user.save((error) =>
          error ? next(error) : res.json("post updated successfully")
        );
      }
    } else {
      next(err);
    }
  });
});

// Updating post with duplicate title
router.put("/:_id/home/posts/update/duplicate", (req, res, next) => {
  const userId = req.params._id;
  const updatedPost = req.body;

  User.findById(userId, (err, user) => {
    if (!err) {
      const previousPost = user.posts.id(updatedPost._id);

      previousPost.title = updatedPost.title;
      previousPost.content = updatedPost.content;

      user.save((error) =>
        error ? next(error) : res.json("updated post with duplicate title")
      );
    }
  });
});

// Deleting post
router.delete("/:_id/posts/:postId", (req, res, next) => {
  const { _id, postId } = req.params;

  User.findById(_id, (err, user) => {
    if (!err) {
      const deletedPost = user.posts.id(postId);
      deletedPost.remove();
      user.save((error) => (error ? next(error) : res.json("post deleted")));
    } else {
      next(err);
    }
  });
});

module.exports = router;
