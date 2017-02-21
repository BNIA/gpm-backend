var path = require('path');
var fs = require('fs');
exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/bmp_types.json');
  var data = JSON.parse(fs.readFileSync(dataPath));
  console.log('logging seed bmp_types.json');
  console.log(data);
  return knex('bmp_types').del().return(data)
    .map(row => {
      return knex('bmp_types').insert({
        id: row.id,
        name: row.name,
        description: row.description
      });
    });
};
