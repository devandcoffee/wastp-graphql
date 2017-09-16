const casual = require('casual')

exports.seed = function(knex, Promise) {
  return knex('players').del().then(function () {
    const promises = Array(40).fill().map(() => {
      return knex('players').insert([{
        email: casual.email,
        status: casual.word,
        goals: casual.integer(0,30),
        wins: casual.integer(0,20),
        loses: casual.integer(0,20),
        ties: casual.integer(0,20),
        user_id: casual.integer(1,10),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
    })
    return Promise.all(promises)
  })
}
