const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require("multer")
const upload = multer ({dest:"./public/uploads/"})
const Picture = require("../models/Picture")
/* GET home page */
router.get('/',ensureLoggedIn("/auth/login"), (req, res, next) => {
  Picture.find().then((Pictures)=>{
    res.render('index',{Pictures});
  })

});

module.exports = router;
