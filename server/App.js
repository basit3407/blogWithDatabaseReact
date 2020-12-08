const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 5000;

const app = express();
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

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("database connected");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
