var path = require('path');
var fs = require('fs');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/sources.json');
  var data = JSON.parse(fs.readFileSync(dataPath));
  return knex('sources').del().return(data)
    .map(row => {
      return knex('sources').insert({
        id: row.id,
        name: row.name,
        description: row.description
      });
    });
};
