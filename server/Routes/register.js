import express from "express";
const router = express.Router();

// importing databaseCollections from App.js
import User from "../App";

//Add new User
router.post("/add", (req, res, next) => {
  const { fname, lname, username, password } = req.body;

  const newUser = new User({
    fname: fname,
    lname: lname,
    username: username,
    password: password,
  });

  newUser.save((err) => {
    if (!err) {
      res.json("user registered");
    } else {
      // check for validation errors
      if (err.name === "ValidationError") {
        const { fname, lname, username, password } = err.errors;

        if (fname) error(fname.message);
        if (lname) error(lname.message);
        if (username) error(username.message);
        if (password) error(password.message);
        // check if username exists
      } else if (err.name === `MongoError` && error.code === 11000) {
        res.status(11000).json({ error: "This username already exist." });
      } else {
        next(err);
      }
    }
  });
  // Send validation error message to client
  function error(message) {
    res.status(400).json({ error: message });
  }
});

module.exports = router;
