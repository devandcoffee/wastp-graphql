exports.up = function(knex, Promise) {
  return knex.schema.createTable('tourneys', (table) => {
    table.increments('id').primary().unsigned()
    table.string('name')
    table.string('description')
    table.date('start_date')
    table.integer('amount_teams').unsigned()
    table.integer('user_id').references('users.id').unsigned()
    table.integer('tourney_type_id').references('tourneys_types.id').unsigned()
    table.integer('sport_id').references('sports.id').unsigned()
    table.timestamps(true)
    table.timestamp('deleted_at')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tourneys')
}
