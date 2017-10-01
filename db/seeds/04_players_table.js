const casual = require('casual')
const { Status } = require('../../utils')

exports.seed = function(knex, Promise) {
  return knex('players').del().then(function () {
    const promises = Array(60).fill().map(() => {
      return knex('players').insert([{
        user_id: casual.integer(1,10),
        team_id: casual.integer(1,20),
        email: casual.email,
        status: casual.random_value(Status),
        goals: casual.integer(0,30),
        wins: casual.integer(0,20),
        loses: casual.integer(0,20),
        ties: casual.integer(0,20),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
    })
    return Promise.all(promises)
  })
}
