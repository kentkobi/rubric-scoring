const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    name: String, 
    follows: { type : Array , "default" : [] },
    avatar: String,
    followers: { type : Number , "default" : 0 },
    posts: { type : Number , "default" : 0 },
    passwordHash: String
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User