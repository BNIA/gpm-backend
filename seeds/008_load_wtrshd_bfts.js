var path = require('path');
var fs = require('fs');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/wtrshd_bfts.json');
  var data = JSON.parse(fs.readFileSync(dataPath));
  return knex('wtrshd_bfts').del().return(data)
    .map(row => {
      return knex('wtrshd_bfts').insert({
        id: row.id,
        name: row.name,
        description: row.description
      });
    });
};
