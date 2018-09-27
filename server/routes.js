const AuthenticationController = require('./controllers/AuthenticationController')
const passport = require('passport')

module.exports = app => {
  app.get('/', function(req, res) {
    res.status(200).send('Server up and running')
  })
  app.post('/register', AuthenticationController.register)
  app.post('/login', AuthenticationController.login)
  app.get(
    '/user',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json(req.user)
    }
  )
}
