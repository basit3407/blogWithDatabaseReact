const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 5000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", express.static("public"));
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

mongoose.connect(
  "mongodb+srv://basit3407:Kmha@3407@cluster0.rpbol.mongodb.net/blogdbDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postSchema);

function updatePost(post, cb) {
  Post.find({ title: post.title }, (err, docs) => {
    if (err) {
      cb(err, post, null);
    } else {
      if (docs.length) {
        cb(null, post, docs);
      } else {
        post.save((error) => cb(error, post, null));
      }
    }
  });
}

app.post("/", (req, res, next) => {
  const newPost = req.body;

  Post.findOne({ title: newPost.title }, (err, post) => {
    if (!err) {
      if (!post) {
        const post = new Post({
          title: newPost.title,
          content: newPost.content,
        });
        post.save((error) => next(error)).then(() => res.json("post added"));
      } else {
        res.status(409).json({
          status: "fail",
          message: ` Title of ${newPost.title} already exsists`,
        });
      }
    } else {
      next(err);
    }
  });
});

app.post("/duplicatetitle", (req, res, next) => {
  const duplicatePost = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  duplicatePost
    .save((err) => next(err))
    .then(() => res.json("duplicate post added"));
});

app.put("/", (req, res, next) => {
  Post.findById(req.body._id, (err, existingPost) => {
    if (!err) {
      existingPost.title = req.body.title;
      existingPost.content = req.body.content;

      updatePost(existingPost, (err2, post, docs) => {
        if (err2) {
          next(err2);
        } else {
          if (docs) {
            const check = docs.filter((doc) => !doc._id.equals(post._id));

            if (check.length) {
              res.status(409).json({
                status: "fail",
                message: `${post.title} already exsists`,
              });
            } else {
              post
                .save((error) => next(error))
                .then(() => res.json("post updated"));
            }
          }
        }
      });
    } else {
      next(err);
    }
  });
});

app.put("/duplicatetitle", (req, res, next) => {
  const editedPost = req.body;

  Post.findByIdAndUpdate(
    editedPost._id,
    { title: editedPost.title, content: editedPost.content },
    { new: true },

    (err) => {
      if (!err) {
        res.json("duplicate post updated");
      } else {
        next(err);
      }
    }
  );
});

app.get("/updatepost/:id", (req, res, next) => {
  const id = req.params.id;

  Post.findById(id, (err, editedPost) => {
    if (!err) {
      res.json(editedPost);
    } else {
      next(err);
    }
  });
});

app.get("/post/:postTitle", function (req, res, next) {
  const requestedPostTitle = req.params;
  Post.findOne({ title: requestedPostTitle.postTitle }, function (err, post) {
    if (!err) {
      if (!post) {
        res.status(404).json({
          status: "fail",
          message: ` post with title of ${requestedPostTitle.postTitle} does not exsists`,
        });
      } else {
        res.json(post);
      }
    } else {
      next(err);
    }
  });
});

app.delete("/post/:postId", (req, res, next) => {
  const posttobeDeletedId = req.params.postId;
  Post.findByIdAndDelete(posttobeDeletedId, (err) => {
    if (!err) {
      res.json("post deleted");
    } else {
      next(err);
    }
  });
});

app.get("/", (req, res, next) => {
  Post.find((err, results) => {
    if (!err) {
      res.json(results);
    } else {
      next(err);
    }
  });
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("database connected");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
