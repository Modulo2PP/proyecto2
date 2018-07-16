const mongoose = require('mongoose');
const Schema   = mongoose.Schema;



const userSchema = new Schema({
  username: {type:String,require:true},
  password: {type: String,require:true},
  picPath:{type:String, default: "http://blog.aulaformativa.com/wp-content/uploads/2016/08/consideraciones-mejorar-primera-experiencia-de-usuario-aplicaciones-web-perfil-usuario.jpg"},
  email:{type:String,required:true},
  albums:{type:[Schema.ObjectId]},
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }

});

const User = mongoose.model('User', userSchema);
module.exports = User;
