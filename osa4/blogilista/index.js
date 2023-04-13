const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// const Blog = mongoose.model('Blog', blogSchema)
// const mongoUrl = process.env.MONGODB_URI
// mongoose.connect(mongoUrl)

// app.use(cors())
// app.use(express.json())




app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})