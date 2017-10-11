const casual = require('casual')

exports.seed = function(knex, Promise) {
  return knex('sports').del().then(() => {
    return knex('sports').insert([
        {name: 'Football 11', description: casual.sentences(2), players_by_team: 11},
        {name: 'Volleyball',description: casual.sentences(2), players_by_team: 6},
        {name: 'Basketball',description: casual.sentences(2), players_by_team: 5}
      ]);
    });
};
