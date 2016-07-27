var path = require('path');
var fs = require('fs');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/dsgn_dfclts.json');
  var data = JSON.parse(fs.readFileSync(dataPath));
  return knex('dsgn_dfclts').del().return(data)
    .map(row => {
      return knex('dsgn_dfclts').insert({
        id: row.id,
        name: row.name,
        description: row.description
      });
    });
};
