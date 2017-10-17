
exports.seed = function(knex, Promise) {
  return knex('incidence_types').del().then(() => {
      return knex('incidence_types').insert([
        {sport_id: 1, name: 'gol'},
        {sport_id: 1, name: 'gol en contra'},
        {sport_id: 1, name: 'tarjeta amarilla'},
        {sport_id: 1, name: 'tarjeta roja'},
        {sport_id: 1, name: 'titular'}
      ]);
    });
};
