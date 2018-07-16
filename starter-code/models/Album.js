const mongoose=require("mongoose")
const albumSchema= new mongoose.Schema({
    name: String,
    pictures: {type:[Schema.ObjectId]}
},{ timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
})

const Album = mongoose.model("Album",albumSchema)

module.exports = Album