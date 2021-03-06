exports.up = function(knex, Promise) {
  return knex.schema.createTable('teams', (table) => {
    table.increments('id').primary().unsigned()
    table.integer('user_id').references('users.id').unsigned()
    table.integer('tourney_id').references('tourneys.id').unsigned()
    table.string('name')
    table.string('description')
    table.integer('players_qty')
    table.string('shield')
    table.string('status')
    table.integer('wins')
    table.integer('loses')
    table.integer('ties')
    table.integer('goals_in_favor')
    table.integer('goals_against')
    table.timestamps(true)
    table.timestamp('deleted_at')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('teams')
}
