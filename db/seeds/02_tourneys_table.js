const casual = require('casual')

exports.seed = function(knex, Promise) {
  return knex('tourneys').del().then(() => {
    let promises = Array(40).fill().map(() => {
      return knex('tourneys').insert([{
        name: casual.words(2),
        description: casual.sentences(2),
        start_date: casual.date('YYYY-MM-DD'),
        amount_teams: casual.integer(10, 20),
        tourney_type_id: casual.integer(1, 2),
        user_id: casual.integer(1, 10),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
    })
    promises.push(knex('tourneys').insert({name: "Liga de Programadores", description: "Programa y gana", tourney_type_id: 2, user_id: 1}))
    return Promise.all(promises)
  })
}
