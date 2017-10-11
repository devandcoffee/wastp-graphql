const casual = require('casual')

exports.seed = function(knex, Promise) {
  return knex('users').del().then(() => {
    const promises = Array(1).fill().map(() => {
      return knex('users').insert([{
        uid: '90NwrGbwmXZG48S78icy46aenXg2',
        email: 'admin@wastp.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
    })

    return Promise.all(promises)
  })
}
