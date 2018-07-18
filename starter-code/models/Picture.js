const mongoose=require("mongoose")
const pictureSchema= new mongoose.Schema({
    name: String,
    path: String,
    users: {type:[String], default:[]}
},{ timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Picture = mongoose.model("Picture",pictureSchema)

module.exports = Picture