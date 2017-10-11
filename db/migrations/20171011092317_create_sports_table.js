
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sports', (table) => {
    table.increments('id').primary().unsigned()
    table.string('name')
    table.string('description')
    table.integer('playersByTeam')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sports')
};
