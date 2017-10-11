
exports.seed = function(knex, Promise) {
  return knex('tourneys_centers').del().then(() => {
      return knex('tourneys_centers').insert([
        {tourney_id: 1, sports_center_id: 1},
        {tourney_id: 1, sports_center_id: 2},
        {tourney_id: 2, sports_center_id: 1}
      ]);
    });
};
