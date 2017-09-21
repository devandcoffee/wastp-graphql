
exports.up = function(knex, Promise) {
  return knex.schema.createTable('players', (table) => {
    table.increments('id').primary().unsigned()
    table.integer('user_id').references('users.id').unsigned()
    table.integer('team_id').references('teams.id').unsigned()
    table.string('email')
    table.string('status')
    table.integer('goals')
    table.integer('wins')
    table.integer('loses')
    table.integer('ties')
    table.timestamps(true)
    table.timestamp('deleted_at')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('players')
}
