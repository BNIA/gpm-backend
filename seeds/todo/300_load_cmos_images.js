var path = require('path');
var fs = require('fs');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/cmos_images.json');
  var images = JSON.parse(fs.readFileSync(dataPath));
  return knex('images')
    .select('images.id')
    .innerJoin('layers', 'images.layer_id', 'layers.id')
    .innerJoin('cmoss', 'cmoss.id', 'layer_detail_id')
    .map(row => {
      return knex('images').del().where({id: row.id});
    }).return(images).map(img => {
      return knex
        .select('layers.id')
        .from('layers')
        .where({
          site_id: parseInt(img.site_id, 10),
          layer_detail_type: 'cmoss'
        })
        .then(row => {
          img.layer_id = row[0].id;
          return img;
        });
    }).map(img => {
      return knex('images')
        .insert({
          public_id: img.public_id,
          layer_id: img.layer_id,
          updated_at: knex.fn.now()
        });
    });
};
