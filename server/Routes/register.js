import express from "express";
const router = express.Router();

// importing databaseCollections from App.js
import User from "../App";

//Add new User
router.post("/", (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = new User({
    name: name,

    email: email,
    password: password,
  });

  newUser.save((err) => {
    if (!err) {
      res.json("user registered");
    } else {
      // check for validation errors
      if (err.name === "ValidationError") {
        const { name, email, password } = err.errors;

        if (name) error(name.message);
        if (email) error(email.message);
        if (password) error(password.message);
        // check if email exists
      } else if (err.name === `MongoError` && error.code === 11000) {
        res.status(11000).json({ error: "This email already exist." });
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
