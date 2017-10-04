
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teams', (table) => {
    table.increments('id').primary().unsigned()
    table.integer('user_id').references('users.id').unsigned()
    table.integer('tourney_id').references('tourneys.id').unsigned()
    table.string('name')
    table.string('description')
    table.integer('playersQty')
    table.string('shield')
    table.string('status')
    table.integer('wins')
    table.integer('loses')
    table.integer('ties')
    table.integer('goalsInFavor')
    table.integer('goalsAgainst')
    table.timestamps(true)
    table.timestamp('deleted_at')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('teams')
};
