const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String,require:true},
  password: {type: String,require:true},
  picPath:String,
  email:{type:String,required:true},
  albums:{type:[Schema.ObjectId],required:true},
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }

});

const User = mongoose.model('User', userSchema);
module.exports = User;
