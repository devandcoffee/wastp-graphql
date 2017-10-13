
exports.seed = function(knex, Promise) {
  return knex('fields').del().then(() => {
      return knex('fields').insert([
        {name: 'Cancha uno', description:'Futbol, sintetico', sports_center_id: 1, sport_id: 1},
        {name: 'Cancha dos', description:'Futbol, natural', sports_center_id: 1, sport_id: 1},
        {name: 'Cancha uno', description:'Volley', sports_center_id: 1, sport_id: 2},
      ])
    })
}
