const casual = require('casual')

exports.seed = function(knex, Promise) {
  return knex('users').del().then(() => {
    const promises = Array(10).fill().map(() => {
      return knex('users').insert([{
        firstname: casual.first_name,
        lastname: casual.last_name,
        email: casual.email,
        avatar: 'http://www.gravatar.com/avatar/?s=200',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
    })

    return Promise.all(promises)
  })
}
