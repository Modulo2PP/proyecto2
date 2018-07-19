const Album = require("../models/Album")
const Picture = require("../models/Picture")

module.exports = (pictureId,albumId,picturePath)=>{
    Album.findById(albumId)
    .then(a=>{
        a.pictures.push(pictureId)
        
        Album.findByIdAndUpdate(albumId,{pictures:a.pictures,cover:picturePath})
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