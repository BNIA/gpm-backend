var path = require('path');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/images.json');
  var images = require(dataPath);
  return knex('images').del().then(() => {
    return Promise.map(images, img => {
      // TODO: more than cmos?
      return knex('images')
        .insert({public_id: img.public_id})
        .return(img.site_id);
    });
  });
};
