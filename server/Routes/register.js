import express from "express";
const router = express.Router();

// importing databaseCollections from App.js
import User from "../App";

//Create new User
router.post("/", (req, res, next) => {
  const newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    username: req.body.email,
    password: req.body.password,
  });

  newUser.save((err) => (err ? next(err) : res.json("user added")));
});

module.exports = router;
