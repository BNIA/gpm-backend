var stat = require('simple-statistics');
var _ = require('lodash');

exports.seed = function(knex, Promise) {
  return knex('vital_signs_indicators').select(['id', 'vital_signs_section_id'])
    .map(row => {
      return knex('vital_signs_data_points')
        .select('value')
        .where({vital_signs_indicator_id: row.id})
        .map(r => r.value)
        .then(values => {
          return {
            vital_signs_indicator_id: row.id,
            vital_signs_section_id: row.vital_signs_section_id,
            values: _.filter(values, v => {
              return v !== null;
            })
          };
        });
    })
    .map(row => {
      var clusters = stat.ckmeans(row.values, 5);
      var breaks = _.map(clusters, (c, i) => {
        if (c.length === 1) {
          return {
            lower: c[0],
            upper: c[0],
            break_number: i + 1,
            vital_signs_indicator_id: row.vital_signs_indicator_id,
            vital_signs_section_id: row.vital_signs_section_id
          };
        } else if (c.length >= 2) {
          return {
            lower: c[0],
            upper: c[c.length - 1],
            break_number: i + 1,
            vital_signs_indicator_id: row.vital_signs_indicator_id,
            vital_signs_section_id: row.vital_signs_section_id
          };
        }
      });
      return breaks;
    }).then(rows => _.flatten(rows))
    .map(row => {
      console.log(row);
      return knex('vital_signs_colors')
        .select('id')
        .where({
          vital_signs_section_id: row.vital_signs_section_id,
          break_number: row.break_number
        })
        .then(r => r[0].id)
        .then(id => {
          row.vital_signs_color_id = id;
        }).return(row);
    }).map(row => {
      return knex('vital_signs_data_breaks').insert({
        break_number: row.break_number,
        upper_bound: row.upper,
        lower_bound: row.lower,
        vital_signs_color_id: row.vital_signs_color_id,
        vital_signs_indicator_id: row.vital_signs_indicator_id
      });
    });
};
