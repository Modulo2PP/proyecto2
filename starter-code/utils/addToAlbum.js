const Album = require("../models/Album")
const Picture = require("../models/Picture")

module.exports = (pictureId,albumId)=>{
    Album.findById(albumId)
    .then(a=>{
        a.pictures.push(pictureId)
        Album.findByIdAndUpdate(albumId,{pictures:a.pictures})
        .then((a)=>{
            console.log("Picture added to album")

        })
        .catch(()=>{
            console.log("Error adding picture to album")

        })
    })
    .catch(err=>{
        console.log("Error finding album")
    })
}