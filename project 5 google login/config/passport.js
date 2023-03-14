import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import * as dotenv from 'dotenv'
dotenv.config()
import User from '../models/user-model.js'
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'

passport.serializeUser((user, done) => {
  console.log('serializing now')
  done(null, user._id)
})

passport.deserializeUser((_id, done) => {
  console.log('deserializing now')
  User.findById({ _id }).then((user) => {
    console.log('Found User')
    done(null, user)
  })
})

passport.use(
  new LocalStrategy((username, password, done) => {
    console.log(username, password)
    User.findOne({ email: username })
      .then(async (user) => {
        if (!user) {
          return done(null, false)
        }
        await bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return done(null, false)
          }
          if (!result) {
            return done(null, false)
          } else {
            return done(null, user)
          }
        })
      })
      .catch((e) => {
        return done(null, false)
      })
  }),
)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLINET_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/redirect',
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback
      console.log(profile)
      User.findOne({ googleID: profile.id }).then((foundUser) => {
        if (foundUser) {
          console.log('User already exits')
          done(null, foundUser)
        } else {
          new User({
            name: profile.displayName,
            googleID: profile.id,
            thumbnail: profile.photos[0].value,
            email: profile.emails[0].value,
          })
            .save()
            .then((newuser) => {
              console.log('New user created')
              done(null, newuser)
            })
        }
      })
    },
  ),
)
