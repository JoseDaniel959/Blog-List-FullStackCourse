const mongoose = require('mongoose')
const config = require("../utils/config.js")

/* 
{
    "title": "Type wars",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    "likes": 2,
    "userID": "66a929033a21525527aebb58"
  }  
*/
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  userID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
module.exports = Blog