import express from "express";
const router = express.Router();

// importing databaseCollections from App.js
import User, { passport } from "../App";

router.post("/", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({
    email: email,
    password: password,
  });

  req.login(user, (err) => {
    err
      ? next(err)
      : passport.authenticate("local")(req, res, next, () => {
          // on Success redirect to homepage of the loggged in user
          try {
            res.redirect(`http://localhost3000/user/${req.user._id}/home`);
          } catch (e) {
            next(e);
          }
        });
  });
});

module.exports = router;
