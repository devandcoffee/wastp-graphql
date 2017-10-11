const casual = require('casual')
const { Status } = require('../../utils')

exports.seed = function(knex, Promise) {
  return knex('players').del().then(() => {
    const promises = Array(60).fill().map(() => {
      return knex('players').insert([{
        user_id: 1,
        team_id: casual.integer(1,20),
        email: casual.email,
        first_name: casual.first_name,
        last_name: casual.last_name,
        status: casual.random_value(Status),
        scores: casual.integer(0,30),
        games: casual.integer(0,20),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
    })
    return Promise.all(promises)
  })
}
