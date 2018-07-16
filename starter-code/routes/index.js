const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require("multer")
const upload = multer ({dest:"./public/uploads/"})

/* GET home page */
router.get('/',ensureLoggedIn("/auth/login"), (req, res, next) => {
  res.render('index');
});

module.exports = router;
