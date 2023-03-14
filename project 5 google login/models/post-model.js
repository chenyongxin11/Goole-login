import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date(+new Date()),
  },
  author: String,
})

export default mongoose.model('Post', postSchema)
