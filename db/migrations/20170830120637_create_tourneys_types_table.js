exports.up = function(knex, Promise) {
  return knex.schema.createTable('tourneys_types', (table) => {
    table.increments('id').primary().unsigned()
    table.string('name')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tourneys_types')
}
