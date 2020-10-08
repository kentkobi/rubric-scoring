const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
})

teamSchema.plugin(uniqueValidator)

teamSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
    }
})

const Team = mongoose.model('Team', teamSchema)
module.exports = Team