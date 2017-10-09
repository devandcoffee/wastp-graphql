const User = require('../models/User')

function authenticate(admin, req) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    return admin.auth().verifyIdToken(token)
      .then((decodedToken) => {
        return User.query().findOne('uid', decodedToken.uid)
      }).catch(function (error) {
        return error
      })
  }
}

module.exports = {
  authenticate
}
