const userRouter = require("express").Router()
const User = require("../models/UserModel")
const bcrypt = require('bcrypt')

userRouter.get('/', async (request,response)=>{
    const user = await User.find({}).populate("blogID")
    response.json(user)
})
 
userRouter.post('/', async (request,response)=>{
    const { username, name, password,blogID} = request.body 
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        name,
        password: passwordHash,
        blogID   
      })
    
    user.save()
    response.status(201).json(user)

})

module.exports = userRouter