const casual = require('casual')

exports.seed = function(knex, Promise) {
  return knex('teams').del().then(function () {
      let promises = Array(20).fill().map(() => {
        return knex('teams').insert([{
            user_id: casual.integer(1, 10),
            tourney_id: casual.integer(1,10),
            name: casual.name,
            description: casual.sentences(2),
            playersQty: casual.integer(0,30),
            shield: casual.word,
            wins: casual.integer(0,10),
            loses: casual.integer(0,10),
            ties: casual.integer(0,10),
            goalsInFavor: casual.integer(0,20),
            goalsAgainst: casual.integer(0,20),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }])
      })
      promises.push(knex('teams').insert({user_id: 1, tourney_id: 41, name: "team name"}))
      return Promise.all(promises)
    });
};
