
exports.seed = function(knex, Promise) {
  return knex('fixtures').del().then(() => {
      return knex('fixtures').insert([
        {name: 'Fecha 1', tourney_id: 1},
        {name: 'Fecha 2', tourney_id: 1},
        {name: 'Fecha 3', tourney_id: 1},
      ])
    })
}
