import { render } from 'ejs'
import express from 'express'
const router = express.Router()
import passport from 'passport'
import User from '../models/user-model.js'
import bcrypt from 'bcrypt'

router.get('/login', (req, res) => {
  res.render('login', { user: req.user })
})

router.get('/signup', (req, res) => {
  res.render('signup', { user: req.user })
})

router.post('/signup', async (req, res) => {
  let { name, email, password } = req.body
  // check if exist
  const emailExist = await User.findOne({ email })
  if (emailExist) {
    req.flash('error_msg', 'Email has already been registered')
    res.redirect('/auth/signup')
  } else {
    const hash = await bcrypt.hash(password, 10)
    password = hash
    let newuser = new User({ name, email, password })
    try {
      const savedUser = await newuser.save()
      req.flash('success_msg', 'You can login now')
      res.redirect('/auth/login')
    } catch (e) {
      console.log(e)
      req.flash('error_msg', e.errors.name.properties.message)
      res.redirect('/auth/signup')
    }
  }
})

router.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/')
})

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/auth/login',
    failureFlash: 'Wrong email or password',
  }),
  (req, res) => {
    if (req.session.returnTo) {
      let newPath = req.session.returnTo
      req.session.returnTo = ''
      res.redirect(newPath)
    } else {
      res.redirect('/profile')
    }
  },
)

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    // prompt: 'select_account',
  }),
)

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  if (req.session.returnTo) {
    let newPath = req.session.returnTo
    req.session.returnTo = ''
    res.redirect(newPath)
  } else {
    res.redirect('/profile')
  }
})

export default router
