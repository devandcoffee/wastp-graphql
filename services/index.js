const jwt = require('jwt-simple')
const moment = require('moment')
const bcrypt = require('bcrypt')
const config = require('../config')

function createToken(user) {
  const payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
  }

  return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN)

      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: `Expired Token`
        })
      }

      resolve(payload.sub)
    }
    catch(err) {
      reject({
        status: 500,
        message: `Invalid Token`
      })
    }
  })

  return decoded
}

function encryptPassword(password) {
  return bcrypt.hash(password, 10).then((hash) => hash)
}

function checkPassword(password, hash) {
  return bcrypt.compare(password, hash).then((res) => res)
}

module.exports = {
  createToken,
  decodeToken,
  encryptPassword,
  checkPassword
}