exports.up = function(knex, Promise) {
  return knex.schema.createTable('tourneys_types', (table) => {
    table.increments('id').primary().unsigned()
    table.string('name')
    table.timestamps(true)
    table.timestamp('deleted_at')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tourneys_types')
}
