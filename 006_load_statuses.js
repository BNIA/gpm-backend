var path = require('path');
var fs = require('fs');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/statuses.json');
  var data = JSON.parse(fs.readFileSync(dataPath));
  console.log('logging seeds statuses');
  console.log(data);
  return knex('statuses').del().return(data)
    .map(row => {
      return knex('statuses').insert({
        id: row.id,
        name: row.name,
        description: row.description
      });
    });
};
