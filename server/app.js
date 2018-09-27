const express = require('express')
const config = require('./config/config')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')

const app = express()

// Middleware
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())

// Pasport Strategy
require('./config/passport')(passport)

// Connection à mongodb
mongoose.connect(
  config.db,
  { useNewUrlParser: true }
)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on(
  'error',
  console.error.bind(
    console,
    `Une erreur s'est produite lors de la connection à mongodb :`
  )
)
db.once('open', function() {
  console.log('Connecté à mongodb')
})

// Routes
require('./routes')(app)

// Running app
app.listen(config.port)
console.log(`Le server a démarré sur le port ${config.port}`)
