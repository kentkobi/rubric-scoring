const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  content: String,
  created: Date,
  likes: { type : Array , "default" : [] },
  mentions: { type : Array , "default" : [] },
  tags: { type : Array , "default" : [] },
  authorUsername: String
})

postSchema.virtual('author', {
  ref: 'User',
  localField: 'authorUsername',
  foreignField: 'username',
  justOne: true
});
  
postSchema.set('toJSON', {
    virtuals: true,
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post 