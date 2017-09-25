const casual = require('casual')
const services = require('../../services')

exports.seed = function(knex, Promise) {
  return knex('users').del().then(() => {
    let promises = Array(10).fill().map(() => {
      return services.encryptPassword('secret').then((hash) => {
        return knex('users').insert([{
          firstname: casual.first_name,
          lastname: casual.last_name,
          email: casual.email,
          password: hash,
          avatar: 'http://www.gravatar.com/avatar/?s=200',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
      })
    })
    promises.push(knex('users').insert({firstname: "Dev", lastname:"Coffee", email:"admin", password:"admin"}))

    return Promise.all(promises)
  })
}
