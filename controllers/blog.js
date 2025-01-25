const jwt = require("jsonwebtoken")
const blogRouter = require("express").Router()
const Blog = require("../models/BlogModel")

blogRouter.get('/', async (request, response) => {

  
  const blogs = await Blog.find({}).populate("userID")
  response.json(blogs)
  
  })

  blogRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const blogs = await Blog.find({_id:id})
    response.json(blogs)
 
  })

  blogRouter.post('/', async (request, response) => {
    const authorization = request.get("authorization") 
    let token = "asd"
    if(authorization && authorization.toLocaleLowerCase().startsWith('bearer')){
      token = authorization.split(' ')[1]
    }
   
    const decodedToken = jwt.verify(token,process.env.SECRET)
    console.log(decodedToken)
    if( decodedToken.id == undefined){
      return response.status(401).json({error:"missing token"})
    }
    
    const blog = new Blog(request.body)
    await blog.save()
    response.status(201).json(blog)

  })

  blogRouter.delete('/:id', async (request,response) =>{
    const id = request.params.id
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  })
   

  blogRouter.patch('/:id', async (request,response) =>{
    
    
    const authorization = request.get("authorization") 
    let token = "asd"
    if(authorization && authorization.toLocaleLowerCase().startsWith('bearer')){
      token = authorization.split(' ')[1]
    
    }
   
    try{
      const decodedToken = jwt.verify(token,process.env.SECRET)
      console.log(decodedToken)
      
    }
    catch(e){
      console.log("incorrect json web token")
      return response.status(401).json({error:"missing token"})
    
    }
    const id = request.params.id
    const newLikesNumbers = request.body.newLikes
    let res = await Blog.findById(id)
    res.likes = newLikesNumbers
    res.save()
    response.status(204).end()
  })
 
  module.exports = blogRouter