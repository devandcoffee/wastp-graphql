
exports.seed = function(knex, Promise) {
  return knex('games').del().then(() => {
      return knex('games').insert([
        {fixture_id:1, field_id: 1, local_id: 1, visitant_id: 2, date:  new Date().toISOString(), local_score: 2, visitant_score: 2},
        {fixture_id:1, field_id: 1, local_id: 1, visitant_id: 2, date:  new Date().toISOString()},
        {fixture_id:1, field_id: 1, local_id: 1, visitant_id: 2, date:  new Date().toISOString()},
      ]);
    });
};
