
exports.seed = function(knex, Promise) {
  return knex('incidences').del().then(() => {
      return knex('incidences').insert([
        {incidence_type_id: 1, player_id: 1, time: '44'},
        {incidence_type_id: 1, player_id: 1, time: '55'},
        {incidence_type_id: 1, player_id: 2, time: '60'},
      ])
    })
}
