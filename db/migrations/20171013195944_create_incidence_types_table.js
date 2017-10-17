exports.up = function(knex, Promise) {
  return knex.schema.createTable('incidence_types', (table) => {
    table.increments('id').primary().unsigned()
    table.integer('sport_id').references('sports.id')
    table.string('name')
    table.string('description')
    table.timestamps(true)
    table.timestamp('deleted_at')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('incidence_types')
}
