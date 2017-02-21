var path = require('path');
var fs = require('fs');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/site_uses.json');
  var data = JSON.parse(fs.readFileSync(dataPath));
  console.log('logging seeds site uses');
  console.log(data);
  return knex('site_uses').del().return(data)
    .map(row => {
      return knex('site_uses').insert({
        id: row.id,
        name: row.name,
        description: row.description
      });
    });
};
