
exports.seed = function(knex, Promise) {
  return knex('incidences').del().then(() => {
      return knex('incidences').insert([
        {id: 1, incidence_type_id: 1, player_id: 1, time: '44'},
        {id: 2, incidence_type_id: 1, player_id: 1, time: '55'},
        {id: 3, incidence_type_id: 1, player_id: 2, time: '60'},
      ]);
    });
};
