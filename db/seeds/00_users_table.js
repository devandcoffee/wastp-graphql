const casual = require('casual')

exports.seed = function(knex, Promise) {
  return knex('users').del().then(() => {
    const promises = Array(10).fill().map((_, i) => {
      return knex('users').insert([{
        id: i + 1,
        firstname: casual.first_name,
        lastname: casual.last_name,
        email: casual.email,
        avatar: 'http://www.gravatar.com/avatar/?s=200'
      }])
    })

    return Promise.all(promises)
  })
}
