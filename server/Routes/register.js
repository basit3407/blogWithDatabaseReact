const express = require("express");
const passport = require("passport");
const router = express.Router();

const User = require("../userModel");

router.post("/", (req, res, next) => {
  User.register(
    { username: req.body.username, name: req.body.name },
    req.body.password,
    (err) => {
      !err
        ? passport.authenticate("local")(req, res, () => {
            // Redirect or do whatever you want after authentication
            res.redirect(`http://localhost3000/user/${req.user._id}/home`);
          })
        : next(err);
    }
  );
});

module.exports = router;
