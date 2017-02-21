var path = require('path');
var fs = require('fs');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/priorities.json');
  var data = JSON.parse(fs.readFileSync(dataPath));
  console.log('logging seeds priorities');
  console.log(data);
  return knex('priorities').del().return(data)
    .map(row => {
      return knex('priorities').insert({
        id: row.id,
        name: row.name,
        description: row.description
      });
    });
};
