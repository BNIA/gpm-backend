var path = require('path');
var fs = require('fs');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/layer_detail_types.json');
  var data = JSON.parse(fs.readFileSync(dataPath));
  console.log('logging seed layer_detail_type');
  console.log(data);
  return knex('layer_detail_types').del().return(data)
    .map(row => {
      return knex('layer_detail_types').insert({
        name: row.name
      });
    });
};
