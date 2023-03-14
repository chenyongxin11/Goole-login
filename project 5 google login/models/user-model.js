import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  googleID: {
    type: String,
  },
  date: {
    type: Date,
    default: () => new Date(+new Date()),
  },
  thumbnail: {
    type: String,
  },
  // local login
  email: {
    type: String,
  },
  password: {
    type: String,
    maxlength: 1204,
  },
})

const User = mongoose.model('User', userSchema)
export default User
