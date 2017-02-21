var path = require('path');
var fs = require('fs');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/layer_filter_types.json');
	console.log('logging seed loadlayerfilteroptions');
  var data = JSON.parse(fs.readFileSync(dataPath));
console.log(data);
  return knex('layer_filter_options').del().then(() => {
    return Promise.map(data, row => {
      return knex(row.name)
        .select('id')
        .map(r => {
          return knex('layer_filter_options').insert({
            layer_detail_type: row.layer_detail_type,
            layer_filter_type: row.name,
            layer_filter_id: r.id
          });
        });
    });
  });
};
