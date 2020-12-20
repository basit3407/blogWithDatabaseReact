const express = require("express");
const router = express.Router();
const passport = require("passport");

// importing databaseCollections from App.js
const User = require("../userModel");

router.post("/", (req, res, next) => {
  const { username, password } = req.body;

  const user = new User({
    username: username,
    password: password,
  });

  req.login(user, (err) => {
    !err
      ? passport.authenticate("local")(req, res, () => {
          // on Success redirect to homepage of the loggged in user
          res.redirect(`http://localhost3000/user/${req.user._id}/home`);
        })
      : next(err);
  });
});

module.exports = router;
