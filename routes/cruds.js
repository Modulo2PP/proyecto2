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
    if(!req.body.albumId){
      req.body.albumId=req.user.albums[0]
      Picture.create([{ path: req.body.path, users:[req.user.username], lastUser: req.user.username}]).then(pi => {
        addToAlbum(pi[0]._id, req.body.albumId);
      })
      .then(()=>{
        res.json({a:"hola"})

      })

      return
    }
    Picture.find({ path: req.body.path }).then(pic => {
      if (pic[0] != null) {
        Picture.findByIdAndUpdate(pic[0]._id, [{users:pic[0].users.push(req.user.username) ,lastUser:req.user.username }])
        .then((p)=>{
          addToAlbum(p._id,req.user.albums[0])
          addToAlbum(p._id, req.body.albumId);
        })
      } else {
        Picture.create([{ path: req.body.path, users:[req.user.username], lastUser: req.user.username}]).then(pi => {
          addToAlbum(pi[0]._id,req.user.albums[0])

          addToAlbum(pi[0]._id, req.body.albumId);
        })
      }
      res.json({a:"hola"})
    });
  }
);
router.post(
  "/pictures/remove",
  ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    //const path = req.body.path;
    const albumId = req.body.albumId;
    Picture.find({ path: req.body.path })
      .then(pic => {
        if (albumId == req.user.albums[0]) {
          User.findById(req.user._id)
            .populate("albums")
            .then(user => {
              user.albums.forEach(e => {
                for (let i = 0; i < e.pictures.length; i++) {
                  if (e.pictures[i] == pic[0]._id + "") {
                    e.pictures.splice(i, i + 1);

                    Album.findByIdAndUpdate(e._id, { pictures: e.pictures })
                      .then(() => {
                        console.log("album actualizado");
                      })
                      .catch(err => {
                        console.log("Error updating album");
                      });
                    break;
                  }
                }
              });
            })
            .catch(err => {
              console.log("Error at pictures remove");
            });

        } else {
          Album.findById(albumId).then(a => {
            for (let i = 0; i < a.pictures.length; i++) {
              console.log(pic[0]._id + a.pictures[i])
              if (pic[0]._id+"" == a.pictures[i]+"") {
                console.log("borra")
                a.pictures.splice(i, i+1);
                break;
              }
            }
            Album.findByIdAndUpdate(a._id, { pictures: a.pictures })
              .then(() => {
                console.log("album actualizado");
              })
              .catch(err => {
                console.log("Error updating album");
              });
          });

        }
      })
      .catch(() => {
        console.log("Error findinng pic at remove pic");
      });
      res.json({a:"hola"})
  }
);

router.get(
  "/:albumId/pictures",
  ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    var id = req.params.albumId;
    Album.findById(id)
      .populate("pictures")
      .then(a => {
        let album = { name: a.name, _id: a._id };
        console.log(a)
        res.render("cruds/pictures", { pictures: a.pictures, album });
      });
  }
);

router.get("/albums/add", ensureLoggedIn("/auth/login"), (req, res, next) => {
  Album.create([{ name: "Unnamed" }])
    .then(a => {
      console.log("Album added");
      User.findById(req.user._id).then(u => {
        console.log(u.albums);
        u.albums.push(a[0]._id);
        console.log(u.albums);

        User.findByIdAndUpdate(req.user._id, { albums: u.albums }).then(() => {
          console.log("album added to user");
        });
      });
      res.json({ album: a });
    })
    .catch(() => {
      console.log("Error adding album ");
    });
});

router.post(
  "/albums/changeName",
  ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    Album.findByIdAndUpdate(req.body.albumId, { name: req.body.name }).then(
      a => {
        console.log("Albums name changed successfully");
      }
    );
  }
);

router.post(
  "/albums/remove",
  ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    console.log(req.body.albumId)
    Album.findByIdAndRemove(req.body.albumId)
    .then(
      ()=> {
        console.log("Album successfully removed");
        res.json({ album: "hola"});

      }
    );
  }
);


router.get(
  "/:albumId/otheruser/pictures",
  ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    var id = req.params.albumId;
    User.findById(req.user._id).populate('albums').then(user=>{
      const personaje = user.username
      const albums = user.albums;
    Album.findById(id)
      .populate("pictures")
      .then(a => {
        let album = { name: a.name, _id: a._id };
          res.render("cruds/otherUserAlbum", { pictures: a.pictures, album, personaje });
        })
      });
  })

module.exports = router;
