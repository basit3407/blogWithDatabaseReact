const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  req.logout();
  res.json("logged out");
  // res.redirect("../login");
});

module.exports = router;
