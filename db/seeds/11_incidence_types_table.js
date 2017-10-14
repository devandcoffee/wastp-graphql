
exports.seed = function(knex, Promise) {
  return knex('incidence_types').del().then(() => {
      return knex('incidence_types').insert([
        {id: 1, sport_id: 1, name: 'gol'},
        {id: 2, sport_id: 1, name: 'gol en contra'},
        {id: 3, sport_id: 1, name: 'tarjeta amarilla'},
        {id: 4, sport_id: 1, name: 'tarjeta roja'},
        {id: 5, sport_id: 1, name: 'titular'}
      ]);
    });
};
