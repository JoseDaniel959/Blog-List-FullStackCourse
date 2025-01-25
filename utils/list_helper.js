const dummy = (blogs) => {
    return 1
  }
  
 
const totalLikes = (blogs) => {
    let suma_de_likes = 0
    for(i =0;i<blogs.length;i++){
        suma_de_likes =  suma_de_likes + blogs[i].likes
        //console.log(typeof(blogs[i].likes))
    }
    return suma_de_likes
}

const favoriteBlog = (blogs) =>{
  //console.log(blogs)
  
  
  let MostLikedBlog = blogs.reduce(
    (acc,currentValue) =>{ return (acc = acc.likes < currentValue.likes ? currentValue : acc)},{
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    })
    return MostLikedBlog
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  } 
