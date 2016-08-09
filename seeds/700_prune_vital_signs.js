var _ = require('lodash');

exports.seed = function(knex, Promise) {
  return knex('vital_signs_indicators')
  .select('id')
  .map(row => {
    return knex('vital_signs_data_points')
    .select('value')
    .where({vital_signs_indicator_id: row.id})
    .map(r => r.value)
    .then(values => {
      return {
        id: row.id,
        values: values
      };
    });
  })
  .map(row => {
    row.toDelete = _.every(row.values, v => {
      return v === null;
    });
    return row;
  })
  .then(rows => _.filter(rows, ['toDelete', true]))
  .map(row => {
    return knex('vital_signs_data_points')
      .where({vital_signs_indicator_id: row.id})
      .del()
      .return(row);
  })
  .map(row => {
    return knex('vital_signs_indicators')
      .where({id: row.id})
      .del();
  });
};
