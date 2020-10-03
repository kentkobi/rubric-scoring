const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreCardSchema = new mongoose.Schema({
  created: Date,
  rubrics: { type : Array , "default" : [] },
})
  
scoreCardSchema.set('toJSON', {
    virtuals: true,
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const ScoreCard = mongoose.model('Score', scoreCardSchema)
module.exports = ScoreCard 