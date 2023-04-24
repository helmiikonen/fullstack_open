const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('api tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('there is a field named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

})

describe('tests for adding new blog', () => {
  test('blogs can be added to the database', async () => {
    const newBlog = {
      title: 'Testiblogi',
      author: 'Testi Testinen',
      url: 'testiurl.com',
      likes: 2
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const blogs = blogsAtEnd.map(blog => blog.title)
    expect(blogs).toContain('Testiblogi')
  })

  test('blog with empty likes field gets 0 likes', async () => {
    const newBlog = {
      title: 'Blogitesti',
      author: 'Tero Testaaja',
      url: 'blogitesti.com'
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
    const blogWithZeroLikes = await Blog.find({ title: 'Blogitesti' })
    const blogJSON = blogWithZeroLikes[0].toJSON()
    expect(blogJSON.likes).toBe(0)
  })

  test('missing title and/or url field cause status code 400', async () => {
    const blogWithNoTitle = {
      author: 'Joku Testihenkilö',
      url: 'testihenkilon-blogi.com'
    }

    await api
    .post('/api/blogs')
    .send(blogWithNoTitle)
    .expect(400)

    const blogWithNoUrl = {
      author: 'Joku Testihenkilö',
      title: 'Otsikko'
    }

    await api
    .post('/api/blogs')
    .send(blogWithNoUrl)
    .expect(400)

  })
})

describe('testing operations for existing blogs', () => {
  test('delete blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    
    const blogs = blogsAtEnd.map(blog => blog.title)
    expect(blogs).not.toContain(blogToDelete.title)
  })

  test('update the number of likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToEdit = blogsAtStart[0]

    const newContent = {...blogToEdit, likes: 10}

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(newContent)
    
    const blogsAtEnd = await helper.blogsInDb()
    const editedBlog = blogsAtEnd[0]
  
    expect(editedBlog.likes).toBe(10)
  })

  test('change blog title', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToEdit = blogsAtStart[0]

    const newContent = {...blogToEdit, title: 'Uusi otsikko'}
    
    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(newContent)
    
    const blogsAtEnd = await helper.blogsInDb()
    const editedBlog = blogsAtEnd[0]
  
    expect(editedBlog.title).toEqual('Uusi otsikko')
  })

  test('change blog url', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToEdit = blogsAtStart[0]

    const newContent = {...blogToEdit, url: 'muuttunutosoite.com'}
    
    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(newContent)
    
    const blogsAtEnd = await helper.blogsInDb()
    const editedBlog = blogsAtEnd[0]
  
    expect(editedBlog.url).toEqual('muuttunutosoite.com')
  })

  test('change author name', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToEdit = blogsAtStart[0]

    const newContent = {...blogToEdit, author: 'Uusi Kirjoittaja'}
    
    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(newContent)
    
    const blogsAtEnd = await helper.blogsInDb()
    const editedBlog = blogsAtEnd[0]
  
    expect(editedBlog.author).toEqual('Uusi Kirjoittaja')
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})