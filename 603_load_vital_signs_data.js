var helpers = require('./helpers');
var path = require('path');
var _ = require('lodash');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/vital_signs_data_points.csv');
  var data = helpers.readCsv(dataPath);
  console.log('logging vital signs data');
  console.log(data);
  return knex('vital_signs_data_points').del().then(() => {
    return data;
  }).then(data => {
    var stretched = _.reduce(data, (res, row) => {
      var csaName = row.community_statistical_area_name;
      var columns = _.omit(row, ['community_statistical_area_name']);
      _.forEach(columns, (val, key) => {
        res.push({
          community_statistical_area_name: csaName,
          vital_signs_indicator_id: key,
          value: val
        });
      });
      return res;
    }, []);
    return stretched;
  }).map(row => {
    // removing null values
    if (row.value === '--' ||
    row.value === 'NA') {
      row.value = null;
    }
    if (row.value !== null) {
      row.value = row.value.replace('$', '');
      row.value = row.value.replace(',', '');
      row.value = parseFloat(row.value);
    }
    return row;
  }).map(row => {
    return knex('boundaries')
      .select('boundary_detail_id')
      .where({boundary_detail_type: 'community_statistical_areas'})
      .where({name: row.community_statistical_area_name})
      .then(boundaries => {
        if (boundaries.length > 0) {
          row.community_statistical_area_id = boundaries[0].boundary_detail_id;
        } else {
          row.community_statistical_area_id = null;
        }
      })
      .return(row);
  }).map(row => {
    var query;
    if (row.community_statistical_area_name === 'Baltimore City') {
      query = knex('vital_signs_indicators').update({
        city_total: row.value
      }).where({id: row.vital_signs_indicator_id});
    } else {
      query = knex('vital_signs_data_points').insert({
        vital_signs_indicator_id: row.vital_signs_indicator_id,
        community_statistical_area_id: row.community_statistical_area_id,
        value: row.value
      });
    }
    return query.return(row);
  });
};
