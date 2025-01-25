const mongoose = require('mongoose')
const config = require("../utils/config.js")

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    blogID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
      }
    ] 
  })

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
module.exports = User
