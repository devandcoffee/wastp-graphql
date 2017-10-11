
exports.seed = function(knex, Promise) {
  return knex('sports_centers').del().then(() => {
      return knex('sports_centers').insert([
        {name: 'Popeye', address: 'Gral. Arenales 960, 4400 Salta', phone:'', created_at: new Date().toISOString(), updated_at: new Date().toISOString()},
        {name: 'Il Calcio', phone:'0387 431-1881', created_at: new Date().toISOString(), updated_at: new Date().toISOString()},
        {name: 'La Española', address:'Balcarce 850, 40400 Salta', phone:'0387 421-5005', created_at: new Date().toISOString(), updated_at: new Date().toISOString()}
      ]);
    });
};
