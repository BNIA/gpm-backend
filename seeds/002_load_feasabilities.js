var path = require('path');
var fs = require('fs');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/feasabilities.json');
  var data = JSON.parse(fs.readFileSync(dataPath));
  console.log('logging seeds feasabilities');
  console.log(data);
  return knex('feasabilities').del().return(data)
    .map(row => {
      return knex('feasabilities').insert({
        id: row.id,
        name: row.name,
        description: row.description
      });
    });
};
