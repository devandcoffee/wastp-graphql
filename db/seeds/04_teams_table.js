const casual = require('casual')
const { Status } = require('../../utils')

exports.seed = function(knex, Promise) {
  return knex('teams').del().then(() => {
      const promises = Array(20).fill().map(() => {
        return knex('teams').insert([{
            user_id: 1,
            tourney_id: casual.integer(1,10),
            name: casual.name,
            description: casual.sentences(2),
            players_qty: casual.integer(0,30),
            shield: casual.word,
            status: casual.random_value(Status),
            wins: casual.integer(0,10),
            loses: casual.integer(0,10),
            ties: casual.integer(0,10),
            goals_in_favor: casual.integer(0,20),
            goals_against: casual.integer(0,20),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }])
      })
      return Promise.all(promises)
    });
};
