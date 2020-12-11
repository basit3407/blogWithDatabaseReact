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
        res.json("user added");
      } else {
        res.status(409).send("Title already exisits");
      }
    } else {
      console.log(err);
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
  const editedPost = req.body;
  // console.log(editedPost);

  Post.findById(editedPost._id, (err, post) => {
    if (!err) {
      // // Find if this title already exsists

      Post.find({ title: editedPost.title }, (error, docs) => {
        if (!error) {
          if (!docs) {
            post.title = editedPost.title;
            post.content = editedPost.content;
            post.save();
          } else {
            //
            res.status(409).send("Conflict");
          }
        } else console.log(error);
      });
    }
  });
});

app.put("/duplicatetitle", (req, res) => {
  const editedPost = req.body;
  console.log(editedPost);

  Post.findByIdAndUpdate(
    editedPost._id,
    { title: editedPost.title, content: editedPost.content },
    { new: true },

    (err) => {
      if (!err) {
        res.json("post updated");
      } else {
        console.log(err);
      }
    }
  );
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Post.findById(id, (err, editedPost) => {
    if (!err) {
      res.json(editedPost);
    } else {
      console.log(err);
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
    } else {
      console.log(err);
    }
  });
});

app.delete("/post/:postId", (req, res) => {
  const posttobeDeletedId = req.params.postId;
  Post.findByIdAndDelete(posttobeDeletedId, (err) => {
    if (!err) {
      res.json("post deleted");
    } else {
      console.log(err);
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
