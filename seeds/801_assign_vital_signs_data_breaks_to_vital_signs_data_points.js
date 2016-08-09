var _ = require('lodash');

exports.seed = function(knex, Promise) {
  return knex('vital_signs_data_points')
    .select()
    .map(row => {
      return knex('vital_signs_data_breaks')
        .select(['upper_bound', 'lower_bound', 'id'])
        .where({vital_signs_indicator_id: row.vital_signs_indicator_id})
        .then(breaks => {
          var id = null;
          _.forEach(breaks, b => {
            if (row.value >= b.lower_bound && row.value < b.upper_bound) {
              id = b.id;
            }
          });
          row.vital_signs_data_break_id = id;
        }).return(row);
    }).map(row => {
      return knex('vital_signs_data_points')
        .update({vital_signs_data_break_id: row.vital_signs_data_break_id})
        .where({id: row.id});
    });
};
