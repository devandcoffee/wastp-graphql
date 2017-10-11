
exports.up = function(knex, Promise) {
  return knex.schema.createTable('fields', (table) => {
    table.increments('id').primary().unsigned()
    table.string('name')
    table.string('description')
    table.integer('sports_center_id').references('sports_centers.id').unsigned()
    table.integer('sport_id').references('sports.id').unsigned
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('fields')
};
