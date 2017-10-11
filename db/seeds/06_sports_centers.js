
exports.seed = function(knex, Promise) {
  return knex('sports_centers').del().then(function () {
      return knex('sports_centers').insert([
        {name: 'Popeye', address: 'Gral. Arenales 960, 4400 Salta', phone:''},
        {name: 'Il Calcio', phone:'0387 431-1881'},
        {name: 'La Española', address:'Balcarce 850, 40400 Salta', phone:'0387 421-5005'}
      ]);
    });
};
