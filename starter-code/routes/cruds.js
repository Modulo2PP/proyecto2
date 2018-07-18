const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });
const Picture = require("../models/Picture");
const Album = require("../models/Album");
const addToAlbum = require("../utils/addToAlbum");
const User = require("../models/User");

/* GET home page */
router.post(
  "/pictures/add",
  ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    Picture.find({ path: req.body.path }).then(pic => {
      if (pic[0] != null) {
        addToAlbum(pic[0]._id, req.user.albums[0]);
      } else {
        Picture.create([{ path: req.body.path }]).then(p => {
          console.log("Picture added successfully");
          addToAlbum(p[0]._id, req.user.albums[0]);
        });
      }
    });
    res.send("");
  }
);
router.post(
  "/pictures/remove",
  ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    const path = req.body.path;
    const albumId = req.body.albumId;
    Picture.find({ path: req.body.path })
      .then(pic => {
        if (albumId == req.user.albums[0]) {
          User.findById(req.user._id)
            .populate("albums")
            .then(user => {
              user.albums.forEach(e => {
                for (let i = 0; i < e.pictures.length; i++) {
                  if (e.pictures[i] == pic[0]._id+"") {
                    e.pictures.splice(i, i+1);

                    Album.findByIdAndUpdate(e._id,{pictures:e.pictures})
                    .then(()=>{
                      console.log("album actualizado")
                    })
                    .catch(err=>{
                      console.log("Error updating album")
                    })
                    break
                  }
                }
              });
              
            })
            .catch(err => {
              console.log("Error at pictures remove");
            });
        } else {
          Album.findById(id)
            .then(a => {
              for(let i=0;i<a.pictures;i++){
                if(pic[0]._id==a.pictures[i]){
                  a.pictures.splice(i,i+1)
                  break
                }

              }
              Album.findByIdAndUpdate(a._id,{pictures:a.pictures})
                    .then(()=>{
                      console.log("album actualizado")
                    })
                    .catch(err=>{
                      console.log("Error updating album")
                    })
              
            })
        }
      })
      .catch(() => {
        console.log("Error findinng pic at remove pic");
      });
  }
);

router.get("/:albumId/pictures", ensureLoggedIn("/auth/login"),(req, res, next) => {
  var id = req.params.albumId;
  Album.findById(id)
    .populate("pictures")
    .then(a => {
      let album = { name: a.name, _id: a._id };
      res.render("cruds/pictures", { pictures: a.pictures, album });
    });
});

router.get("/albums/add", ensureLoggedIn("/auth/login"),(req, res, next) => {
  Album.create([{name:"Unnamed"}])
    .then(a => {
      console.log("Album added")
      
      res.json({ album:a });
    })
    .catch(()=>{
      console.log("Error adding album ")
    })
});



module.exports = router;
