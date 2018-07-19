const mongoose=require("mongoose")
const albumSchema= new mongoose.Schema({
    name: String,
    pictures: {type:[{type:mongoose.Schema.ObjectId,ref:"Picture"}],default:[]},
    cover:{type:String,default:"https://previews.123rf.com/images/themoderncanvas/themoderncanvas1602/themoderncanvas160200091/52803071-fotos-icono-digital-%C3%81lbum-de-fotos-se%C3%B1al-galer%C3%ADa-de-im%C3%A1genes-de-s%C3%ADmbolos-blanco-icono-de-la-galer%C3%ADa-de-im%C3%A1genes-so.jpg"}
},{ timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
})

const Album = mongoose.model("Album",albumSchema)

module.exports = Album