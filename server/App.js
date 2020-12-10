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
  { useNewUrlParser: true, useUnifiedTopology: true }
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
