const admin = require('firebase-admin')
const serviceAccount = require('../serviceAccountKey.json')
const config = require('../config')
const User = require('../models/User')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebaseUri
})

module.exports = {
  authenticate: async (req) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      try {
        const decodedToken = await admin.auth().verifyIdToken(token)
        return User.query().findOne('uid', decodedToken.uid)
      } catch (error) {
        return error
      }
    }
  },
  signUp: async (newUser) => {
    try {
      const userRecord = await admin.auth().createUser(newUser)
      return userRecord
    } catch (error) {
      return error
    }
  }
}
