
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', (table) => {
    table.increments('id').primary().unsigned()
    table.integer('fixture_id').references('fixtures.id').unsigned().onDelete('CASCADE')
    table.integer('field_id').references('fields.id').unsigned()
    table.integer('local_id').references('teams.id').unsigned()
    table.integer('visitant_id').references('teams.id').unsigned()
    table.integer('local_score')
    table.integer('visitant_score')
    table.timestamp('date')
    table.timestamps(true)
    table.timestamp('deleted_at')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('games')
}
