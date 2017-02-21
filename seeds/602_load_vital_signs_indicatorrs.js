
var helpers = require('./helpers');
var path = require('path');

exports.seed = function(knex, Promise) {
};
/*
  console.log('logging seed vital signs indicators');
  var dataPath = path.join(__dirname,
    './data/vital_signs_indicators.csv');
  var data = helpers.readCsv(dataPath);
  console.log(data);
  console.log('wahoo')
  console.log('FLURRRP');
  return knex('vital_signs_indicators').del().then(() => {
    return data;
  }).map(row => {
    return knex('vital_signs_sections')
      .select('id')
      .where({name: row.section_name})
      .then(section => {
        row.vital_signs_section_id = section[0].id;
      }).return(row);
  }).map(row => {
    return knex('vital_signs_indicators')
      .insert({
        id: row.id,
        name: row.name,
        short_name: row.short_name,
        vital_signs_section_id: row.vital_signs_section_id,
        source_name: row.short_source,
        description: row.description
      });
  });
  console.log('well it broke, i hope were happy');
};
*/
