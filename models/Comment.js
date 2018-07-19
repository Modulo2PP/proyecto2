const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = Schema({
  content: {type:String,required:true},
  creatorId:    Schema.ObjectId,
  postId:    Schema.ObjectId,
  picPath: String,
  picName: String
},{ timestamps: {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
}
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

