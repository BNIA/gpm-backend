var fs = require('fs');
var path = require('path');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname,
    './data/community_managed_open_spaces_images.json');
  var data = JSON.parse(fs.readFileSync(dataPath));
  console.log('logging seeds cmos images');
  console.log(data);
  return knex('images')
    .del()
    .then(() => {
      return data;
    })
    .map(row => {
      return knex('layers').select('id').where({
        site_id: row.site_id,
        layer_detail_type: row.layer_detail_type
      }).returning('id')
      .then(r => {
        var id = r[0].id;
        row.layer_id = id;
        return row;
      });
    })
    .map(row => {
      return knex('images').insert({
        layer_id: parseInt(row.layer_id, 10),
        public_id: row.public_id,
        updated_at: knex.fn.now()
      });
    });
};
