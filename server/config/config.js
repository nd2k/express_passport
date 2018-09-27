const path = require('path')

module.exports = {
  port: process.env.PORT || 8081,
  db: 'mongodb://localhost:27017/myApp',
  secretOrKey: 'myApp'
}
