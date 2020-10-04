const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  created: Date,
  team: String,
  criterias: { type : Array , "default" : [] },
  score: Number,
  judge: String
})

scoreSchema.virtual('author', {
  ref: 'User',
  localField: 'judge',
  foreignField: 'username',
  justOne: true
});
  
scoreSchema.set('toJSON', {
    virtuals: true,
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Score = mongoose.model('Score', scoreSchema)
module.exports = Score 