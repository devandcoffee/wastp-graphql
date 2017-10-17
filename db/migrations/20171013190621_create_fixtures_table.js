exports.up = function(knex, Promise) {
  return knex.schema.createTable('fixtures', (table) => {
    table.increments('id').primary().unsigned()
    table.integer('tourney_id').references('tourneys.id').unsigned()
    table.string('name')
    table.timestamps(true)
    table.timestamp('deleted_at')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('fixtures')
}
