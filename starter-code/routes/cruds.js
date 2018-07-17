const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });
const Picture = require("../models/Picture");
const Album = require("../models/Album");
const addToAlbum = require("../utils/addToAlbum")
/* GET home page */
router.post("/pictures/add", ensureLoggedIn("/auth/login"), (req, res, next) => {
  Picture.find({ path: req.body.path }).then(pic => {
    console.log(pic)
    if (pic[0] !== null) {
      addToAlbum(pic[0]._id,req.user.albums[0])
    } else {
      Picture.create([{ path: req.body.path }]).then(p => {
        console.log("Picture added successfully");
        addToAlbum(p[0]._id,req.user.albums[0])
      });
    }
  });
  res.send("")
});

router.get("/:album/pictures", (req, res, next) => {
  res.render("cruds/pictures");
});

module.exports = router;
