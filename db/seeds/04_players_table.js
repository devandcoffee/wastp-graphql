const casual = require('casual')

exports.seed = function(knex, Promise) {
  return knex('players').del().then(function () {
    let promises = Array(60).fill().map(() => {
      return knex('players').insert([{
        user_id: casual.integer(1,10),
        team_id: casual.integer(1,20),
        email: casual.email,
        status: casual.word,
        goals: casual.integer(0,30),
        wins: casual.integer(0,20),
        loses: casual.integer(0,20),
        ties: casual.integer(0,20),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
    })
    promises.push(knex('players').insert({user_id: 1, team_id: 21, email: "player.email"}))
    return Promise.all(promises)
  })
}
