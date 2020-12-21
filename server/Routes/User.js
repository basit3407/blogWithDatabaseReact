const express = require("express");
const router = express.Router();

const User = require("../userModel");

//Home page for user with all the posts;
router.get("/:userId/home", (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId, (err, user) => {
    !err ? res.json(user.posts) : console.log(err);
  });
});

//Dedicated page for each post
router.get("/userId/posts/:postId", (req, res, next) => {
  const { userId, postId } = req.params;
  if (req.isAuthenticated) {
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
  } else {
    try {
      res.redirect("http://localhost3000/login");
    } catch (e) {
      next(e);
    }
  }
});

// Sending updated Post
router.get("/:userId/posts/:postId/updated", (req, res, next) => {
  if (req.isAuthenticated) {
    const { userId, postId } = req.params;

    User.findById(userId, (err, user) => {
      if (!err) {
        const selectedPost = user.posts.id(postId);

        res.json(selectedPost);
      } else {
        next(err);
      }
    });
  } else {
    try {
      res.redirect("http://localhost3000/login");
    } catch (e) {
      next(e);
    }
  }
});

//Adding New post
router.post("/:userId/add/new", (req, res, next) => {
  const { userId } = req.params;
  if (req.isAuthenticated) {
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
          user.save((error) =>
            err ? next(error) : res.json("Post added sucessfully")
          );
        }
      } else {
        next(err);
      }
    });
  } else {
    try {
      res.redirect("http://localhost3000/login");
    } catch (e) {
      next(e);
    }
  }
});

// Adding Post with duplicate title
router.post("/:userId/add/duplicate", (req, res, next) => {
  if (req.isAuthenticated) {
    const duplicatePost = req.body;
    const { userId } = req.params;

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
  } else {
    try {
      res.redirect("http://localhost3000/login");
    } catch (e) {
      next(e);
    }
  }
});

// Updating Post
router.put("/:userId/posts/:postId/update", (req, res, next) => {
  if (req.isAuthenticated) {
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

            user.save((error) =>
              error ? next(error) : res.json("post updated successfully")
            );
          }
        } else {
          const previousPost = user.posts.id(postId);
          previousPost.title = req.body.title;
          previousPost.content = req.body.content;

          user.save((error) =>
            error ? next(error) : res.json("post updated successfully")
          );
        }
      } else {
        next(err);
      }
    });
  } else {
    try {
      res.redirect("http://localhost3000/login");
    } catch (e) {
      next(e);
    }
  }
});

// Updating post with duplicate title
router.put("/:userId/posts/:postId/update/duplicate", (req, res, next) => {
  if (req.isAuthenticated) {
    const { userId, postId } = req.params;
    const updatedPost = req.body;

    User.findById(userId, (err, user) => {
      if (!err) {
        const previousPost = user.posts.id(postId);

        previousPost.title = updatedPost.title;
        previousPost.content = updatedPost.content;

        user.save((error) =>
          error ? next(error) : res.json("updated post with duplicate title")
        );
      }
    });
  } else {
    try {
      res.redirect("http://localhost3000/login");
    } catch (e) {
      next(e);
    }
  }
});

// Deleting post
router.delete("/:userId/posts/:postId", (req, res, next) => {
  if (req.isAuthenticated) {
    const { userId, postId } = req.params;

    User.findById(userId, (err, user) => {
      if (!err) {
        const deletedPost = user.posts.id(postId);
        deletedPost.remove();
        user.save((error) => (error ? next(error) : res.json("post deleted")));
      } else {
        next(err);
      }
    });
  } else {
    try {
      res.redirect("http://localhost3000/login");
    } catch (e) {
      next(e);
    }
  }
});

module.exports = router;
