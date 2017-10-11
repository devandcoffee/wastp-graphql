exports.up = function(knex, Promise) {
  return knex.schema.createTable('players', (table) => {
    table.increments('id').primary().unsigned()
    table.integer('user_id').references('users.id').unsigned()
    table.integer('team_id').references('teams.id').unsigned()
    table.string('email')
    table.string('first_name')
    table.string('last_name')
    table.string('status')
    table.integer('scores')
    table.integer('games')
    table.timestamps(true)
    table.timestamp('deleted_at')
    table.integer('updated_by')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('players')
}
