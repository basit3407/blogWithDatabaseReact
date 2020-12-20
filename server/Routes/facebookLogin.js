const express = require("express");

const passport = require("passport");
const router = express.Router();

router.get("/", passport.authenticate("facebook"));

router.get(
  "/DailyJournal",
  passport.authenticate("facebook", {
    // on Failure redirect to login page
    failureRedirect: `http://localhost3000/login`,
  }),
  (req, res) => {
    // Successful authentication, redirect to home page
    res.redirect(`http://localhost3000/user/${req.user._id}/home`);

    res.json(req.user._id);
  }
);

module.exports = router;
