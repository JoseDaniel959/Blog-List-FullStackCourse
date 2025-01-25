const express = require('express')
const app = express()
const cors = require('cors')
const config = require("./utils/config.js")
const Blog = require("./models/BlogModel.js")
const blogRouter = require("./controllers/blog.js")
const userRouter = require("./controllers/user.js")
const loginRouter = require('./controllers/login')

//const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use("/api/blogs",blogRouter)
app.use("/api/users",userRouter)
app.use("/api/login",loginRouter)


if (process.env.NODE_ENV == 'test') {
  const testingRouter = require('./controllers/testing.js')
  app.use('/api/testing', testingRouter)
}



app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

module.exports = app