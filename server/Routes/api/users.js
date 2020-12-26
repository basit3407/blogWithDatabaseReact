const express = require("express");
const passport = require("passport");
const router = express.Router();

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/userModel");

// @route POST api/user/register
// @desc Register user
// @access Public
router.post("/register", (req, res, next) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.register(
    { email: req.body.email, name: req.body.name },
    req.body.password,
    (err) => {
      !err
        ? passport.authenticate("local")(req, res, () => {
            // Redirect or do whatever you want after authentication
            res.json("user added");
          })
        : next(err);
    }
  );
});

// @route POST api/user/login
// @desc Login user,start session and respond with user details
// @access Public
router.post("/login", (req, res, next) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  req.login(user, (err) => {
    !err
      ? passport.authenticate("local")(req, res, () => {
          // on Success send user details
          res.json(req.user);
        })
      : next(err);
  });
});

// @route GET api/user/logout
// @desc logs out user and ends session
// @access authenticated user
router.get("/:userId/logout", function (req, res) {
  req.logout();
  res.json("logged out");
  // res.redirect("../login");
});

// load post routes
const posts = require("./posts");

router.use("/:userId/post", posts);

module.exports = router;
