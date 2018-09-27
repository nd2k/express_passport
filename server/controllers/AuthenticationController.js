const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
  register(req, res) {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(403).json({
          error: 'Votre adresse email est déjà utilisée!'
        })
      } else {
        const newUser = new User({
          email: req.body.email,
          displayName: req.body.displayName,
          password: req.body.password,
          avatar: req.body.avatar
        })

        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) throw error
            newUser.password = hash
            newUser
              .save()
              .then(user => res.json(user))
              .catch(error => console.log(error))
          })
        })
      }
    })
  },

  login(req, res) {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ email }).then(user => {
      if (!user) {
        return res.status(404).json({
          error: "L'utilisateur n'existe pas"
        })
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            avatar: user.avatar
          }
          jwt.sign(
            payload,
            config.secretOrKey,
            {
              expiresIn: 3600
            },
            (error, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
            }
          )
        } else {
          return res.status(400).json({
            error: 'Mot de passe incorrect'
          })
        }
      })
    })
  }
}
