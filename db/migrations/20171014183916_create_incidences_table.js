
exports.up = function(knex, Promise) {
  return knex.schema.createTable('incidences', (table) => {
    table.increments('id').primary().unsigned()
    table.integer('incidence_type_id').references('incidence_types.id')
    table.integer('player_id').references('players.id')
    table.string('time')
    table.timestamps(true)
    table.timestamp('deleted_at')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('incidences')
}
