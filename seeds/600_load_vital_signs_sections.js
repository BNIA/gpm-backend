var path = require('path');
var fs = require('fs');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/vital_signs_sections.json');
  var data = JSON.parse(fs.readFileSync(dataPath));
  return knex('vital_signs_sections').del().then(() => {
    return data;
  }).map(row => {
    return knex('vital_signs_sections').insert({
      name: row.name
    });
  });
};
