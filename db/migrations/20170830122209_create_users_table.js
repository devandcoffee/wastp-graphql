exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary().unsigned()
    table.string('firstname')
    table.string('lastname')
    table.string('email')
    table.string('avatar')
    table.timestamps(true)
    table.timestamp('deleted_at')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
