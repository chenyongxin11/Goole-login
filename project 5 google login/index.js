import express from 'express'
const app = express()
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()
import authRoute from './routes/auth-route.js'
import './config/passport.js'
import profileRoute from './routes/profile-route.js'
import passport from 'passport'
import session from 'express-session'
import flash from 'connect-flash'

// mongoose link
mongoose
  .connect(
    'mongodb+srv://root:root@cluster0.thyncde.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log('connect to mongdb atlas.')
  })
  .catch((e) => {
    console.log(e)
  })

//middle ware
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  }),
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})
app.use('/auth', authRoute)
app.use('/profile', profileRoute)

app.get('/', (req, res) => {
  res.render('index.ejs', { user: req.user })
})

app.listen(8080, () => {
  console.log('server runnig at 8080')
})
