const casual = require('casual')

exports.seed = function(knex, Promise) {
  return knex('tourneys_types').del().then(() => {
    const promises = ['league', 'cup'].map((elem, i) => {
      return knex('tourneys_types').insert([{
        id: i + 1,
        name: elem
      }])
    })

    return Promise.all(promises)
  })
}
