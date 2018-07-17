const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });
const Picture = require("../models/Picture");
const Album = require("..models/Album");
/* GET home page */
router.get("/picture/add", ensureLoggedIn("/auth/login"), (req, res, next) => {
  Picture.find({ path: req.params.url }).then(pic => {
    if (pic != null) {
      next();
    } else {
      Picture.create([{ path: req.params.url }]).then(e => {
        console.log("Picture added successfully");
        next();
      });
    }
  });
});

router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
