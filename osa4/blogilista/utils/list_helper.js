var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  var total = 0
  blogs.map(blog => total += blog.likes)
  return total
}

const favoriteBlog = (blogs) => {
  var mostLikes = 0
  var blogWithMostLikes = null
  blogs.map(blog => { 
    if (blog.likes >= mostLikes) {
      mostLikes = blog.likes
      blogWithMostLikes = blog
    }
  })
  if (blogWithMostLikes === null) {
    return null
  } else {
    return {
      title: blogWithMostLikes.title,
      author: blogWithMostLikes.author,
      likes: blogWithMostLikes.likes
    } 
  }
}

const mostBlogs = (blogs) => {
  const blogsByAuthor = []
  blogs.map(blog => {
    if (blogsByAuthor.find(item => item.author === blog.author) === undefined) {
      blogsByAuthor.push({author: blog.author, blogs: 1})
    } else {
      const item = blogsByAuthor.find(item => item.author === blog.author)
      item.blogs += 1
    }
  })
  if (blogsByAuthor.length === 0) {
    return null
  } else {
    return _.maxBy(blogsByAuthor, 'blogs')
  }
}

const mostLikes = (blogs) => {
  const blogsByAuthor = []
  blogs.map(blog => {
    if (blogsByAuthor.find(item => item.author === blog.author) === undefined) {
      blogsByAuthor.push({author: blog.author, likes: blog.likes})
    } else {
      const item = blogsByAuthor.find(item => item.author === blog.author)
      item.likes += blog.likes
    }
  })
  if (blogsByAuthor.length === 0) {
    return null
  } else {
    return _.maxBy(blogsByAuthor, 'likes')
  }  
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}