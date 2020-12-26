const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/DailyJournal",
  passport.authenticate("google", {
    // on Failure redirect to login page
    failureRedirect: "http://localhost3000/login",
  }),
  // on Success redirect to homepage
  function (req, res, next) {
    try {
      res.redirect(`http://localhost3000/user/${req.user._id}/home`);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
