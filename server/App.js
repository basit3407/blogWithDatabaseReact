const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 5000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    if (!err && docs.length) {
      cb(null, post, docs);
    } else {
      post.save((err) => cb(err, post, null));
    }
  });
}

app.post("/", (req, res) => {
  const newPost = req.body;

  Post.findOne({ title: newPost.title }, (err, post) => {
    if (!err) {
      if (!post) {
        const post = new Post({
          title: newPost.title,
          content: newPost.content,
        });
        post.save();
        res.json("post added");
      } else {
        res.status(409).send("Title already exisits");
      }
    }
  });
});

app.post("/duplicatetitle", (req) => {
  const duplicatePost = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  duplicatePost.save();
});

app.put("/", (req, res) => {
  Post.findById(req.body._id, (err, existingPost) => {
    if (!err && existingPost) {
      existingPost.title = req.body.title;
      existingPost.content = req.body.content;
      updatePost(existingPost, (err2, post, docs) => {
        if (docs) {
          const check = docs.filter((doc) => !doc._id.equals(post._id));

          if (check.length || err2) {
            res.status(409).send("post already exist");
          } else {
            post.save().then(() => res.json("post updated"));
          }
        } else {
          if (err2) {
            res.status(409).send("post already exist");
          } else {
            res.json("post updated");
          }
        }
      });
    }
  });
});

app.put("/duplicatetitle", (req, res) => {
  const editedPost = req.body;

  Post.findByIdAndUpdate(
    editedPost._id,
    { title: editedPost.title, content: editedPost.content },
    { new: true },

    (err) => {
      if (!err) {
        res.json("duplicate post updated");
      }
    }
  );
});

app.get("/updatepost/:id", (req, res) => {
  const id = req.params.id;

  Post.findById(id, (err, editedPost) => {
    if (!err) {
      res.json(editedPost);
    }
  });
});

app.get("/post/:postTitle", function (req, res) {
  const requestedPostTitle = req.params;
  Post.findOne({ title: requestedPostTitle.postTitle }, function (err, post) {
    if (!err) {
      if (!post) {
        res.status(404).send("Not found");
      } else {
        res.json(post);
      }
    }
  });
});

app.delete("/post/:postId", (req, res) => {
  const posttobeDeletedId = req.params.postId;
  Post.findByIdAndDelete(posttobeDeletedId, (err) => {
    if (!err) {
      res.json("post deleted");
    }
  });
});

app.get("/", (req, res) => {
  Post.find((err, results) => {
    if (!err) {
      res.json(results);
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
