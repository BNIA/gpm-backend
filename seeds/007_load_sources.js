var path = require('path');
var fs = require('fs');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/sources.json');
  var data = JSON.parse(fs.readFileSync(dataPath));
  console.log('logging seeds sources');
  console.log(data);
  return knex('sources').del().return(data)
    .map(row => {
      return knex('sources').insert({
        id: row.id,
        name: row.name,
        description: row.description
      });
    });
};
