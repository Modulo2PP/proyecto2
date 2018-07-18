const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require("multer")
const upload = multer ({dest:"./public/uploads/"})
const Picture = require("../models/Picture")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const bcryptSalt = 10
const Album = require('../models/Album')
/* GET home page */
router.get('/explore',ensureLoggedIn("/auth/login"), (req, res, next) => {
  Picture.find({lastUser:{$ne:req.user.username}}).sort({updated_at: -1}).then((Pictures)=>{
    User.findById(req.user._id).populate('albums').then(user=>{
      const albums = user.albums;
      
      res.render('explore',{Pictures,albums});
    })

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


router.post("/userinfo",(req,res,next) =>{
  const user = req.user;
  const {username,email,password,passconfirm}=req.body;
  // console.log(req.file)
  // const imgPath = req.file;
  // if(imgPath==null || imgPath==undefined){
  //   imgPath="https://static.vix.com/es/sites/default/files/styles/large/public/btg/universos-2.jpg?itok=IpTWZVlD"
  // }
  if (password !=passconfirm ) {
    res.render("user-info", { message: "Wrong password" ,user});
  }
  else if(password){
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
  User.findOneAndUpdate({_id:user},{"username":username,"email": email,"password":hashPass}).then(()=>{
   res.redirect("/");
  })
}
  else{
  User.findOneAndUpdate({_id:user},{"username":username,"email":email}).then(()=>{
    res.redirect("/");
  });
  }
 });


router.get('/mycollection', ensureLoggedIn("/auth/login"),(req, res, next) => {
  User.findById(req.user._id)
  .populate("albums")
  .then(user=>{
    res.render('cruds/albums',{albums:user.albums.slice(1),album_0:user.albums[0]});

  })
  .catch(err=>{
    console.log("Error getting albums")
  })
});

router.get('/otheruser', ensureLoggedIn("/auth/login"),(req, res, next) => {
  res.render('otherUser');
});

module.exports = router;
