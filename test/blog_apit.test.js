const { test, describe,beforeEach } = require('node:test')
const assert = require('node:assert')
const Helpers = require('../utils/list_helper')
const app = require("../index.js")
const supertest = require('supertest')
const Blog = require("../models/BlogModel.js")

const api = supertest(app)
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

beforeEach(async ()=>{
  await Blog.deleteMany({})
  let blogObject = new Blog(blogs[0])
  await blogObject.save()
  blogObject = new Blog(blogs[1])
  await blogObject.save()

})


test('dummy returns one', () => {
  const blogs = []
  //console.log(Helpers.favoriteBlog())
  const result = Helpers.dummy(blogs)
  assert.strictEqual(result, 1)
})
describe('test of likes', () =>{
  
  
  test("total Likes of list of blogs", () =>{
      const result = Helpers.totalLikes(blogs)
      assert.strictEqual(result, 36)
  })

  test('favorite blog', () =>{
    const result = Helpers.favoriteBlog(blogs)
    assert.deepStrictEqual(result,blogs[2])
  })
  
})

describe('Api test', () => {
  test('Correct amount of blogs in Database', async ()=>{
    const response = await api.get('/api/blogs/')
    assert.strictEqual(response.body.length,2)
    
  })

  test('identifier must be named as _id', async ()=>{
    const response = await api.get('/api/blogs/')
    const test_result = "Passes"
    for(i = 0 ;i<response.length;i++){
      if(!("-id" in i[0])){
        test_result= "Not passes"

      }
     }

     assert.strictEqual(test_result, "Passes")
  })

  test('HTTP POST to /api/blogs creates a new person', async()=>{
    const response1 = await api.get('/api/blogs/')
    const len1 = response1.body.length
    await api.post('/api/blogs/').send(blogs[3])
    const response2 = await api.get('/api/blogs/')
    const len2 = response2.body.length

    assert.strictEqual(len1+1, len2)
  })

  test('HTTP DELETE to /api/blogs/id deletes the correct person', async()=>{
    const response1 = await api.delete('/api/blogs/' + blogs[0]._id)
    const response2 = await Blog.findById(blogs[0]._id)
    assert.strictEqual(response2,null)
  })

  test('HTTP PATCH to /api/blogs/id edits the correct person', async() =>{
    const response1 = await api.patch('/api/blogs/'+ blogs[1]._id).send({newLikes: '22222'})
    const response2 = await api.get('/api/blogs/' + blogs[1]._id)
    let likes = response2.body[0].likes
    assert.strictEqual(likes,22222)
    
  })
})
