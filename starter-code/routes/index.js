const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require("multer")
const upload = multer ({dest:"./public/uploads/"})
const Picture = require("../models/Picture")
const User = require("../models/User")
/* GET home page */
router.get('/explore',ensureLoggedIn("/auth/login"), (req, res, next) => {
  Picture.find().sort({updated_at: 1}).then((Pictures)=>{
    res.render('explore',{Pictures});
  })

});

router.get('/', ensureLoggedIn("/auth/login"),(req, res, next) => {
  res.render('index');
});
router.get('/collect', ensureLoggedIn("/auth/login"),(req, res, next) => {
  res.render('collect');
});

router.get('/userinfo',ensureLoggedIn("/auth/login"), (req, res, next) => {
    res.render('user-info');
});

router.get('/mycollection', ensureLoggedIn("/auth/login"),(req, res, next) => {
  User.findById(req.user._id)
  .populate("albums")
  .then(user=>{
    res.render('cruds/albums',{albums:user.albums});

  })
  .catch(err=>{
    console.log("Error getting albums")
  })
});


module.exports = router;
