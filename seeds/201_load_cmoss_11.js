var helpers = require('./helpers');
var path = require('path');
// var _ = require('lodash');

exports.seed = function(knex, Promise) {
  var dataPath = path.join(__dirname, './data/cmoss_11.csv');
  var data = helpers.readCsv(dataPath);

  return knex('layers').select('id', 'layer_detail_id').where({
    layer_detail_type: 'cmoss',
    data_date: '2011-01-01'
  })
  .map(row => {
    return knex('layers_sources').del().where({layer_id: row.id}).return(row);
  }).map(row => {
    return knex('layers').del().where({
      id: row.id
    }).return(row);
  }).map(row => {
    return knex('cmoss_site_uses').del().where({
      cmoss_id: row.layer_detail_id
    }).return(row);
  }).map(row => {
    return knex('cmoss').del().where({
      id: row.layer_detail_id
    });
  }).return(data).map(row => {
    row.site_use_ids = row.site_use_ids === null ?
         [] : row.site_use_ids.split(', ');
    row.source_ids = row.source_ids === null ?
      [] : row.source_ids.split(', ');
    row.geojson = {
      type: 'Point',
      coordinates: [row.point_x, row.point_y]
    };
    return row;
  }).map(row => {
    return knex('cmoss')
      .insert({
        name: row.name,
        address: row.address,
        block: row.block,
        lot: row.lot
      })
      .returning('id')
      .then(id => {
        row.cmos_id = parseInt(id, 10);
        return row;
      });
  }).map(row => {
    return Promise.map(row.site_use_ids, id => {
      return knex('cmoss_site_uses').insert({
        site_use_id: id,
        cmos_id: row.cmos_id
      });
    }).return(row);
  }).map(row => {
    return knex('layers').insert({
      data_date: '2011-01-01',
      layer_detail_id: row.cmos_id,
      layer_detail_type: 'cmoss',
      site_id: row.site_id,
      geojson: row.geojson,
      geometry: knex.raw('ST_SetSRID(ST_Point(?,?),?)', [
        row.point_x, row.point_y, '4326'
      ]),
      updated_at: knex.fn.now()
    }).returning('id')
      .then(id => {
        row.layer_id = parseInt(id, 10);
        return row;
      });
  }).map(row => {
    return Promise.map(row.source_ids, id => {
      return knex('layers_sources').insert({
        source_id: id,
        layer_id: row.layer_id
      });
    });
  });
};
//   }).then(() => {
//     return data;
//   }).map(row => {
//     console.log(row);
//

//   }).map(row => {
//     return Promise.map(row.site_use_ids, id => {
//       return knex('cmoss_site_uses').insert({
//         site_use_id: id,
//         cmoss_id: row.cmoss_id
//       });
//     }).return(row);
//   }).map(row => {
//     return knex('layers').insert({
//       data_date: '2011-01-01',
//       layer_detail_id: row.cmoss_id,
//       layer_detail_type: 'cmoss',
//       site_id: row.site_id,
//       geojson: row.geojson,
//       geometry: knex.raw('ST_SetSRID(ST_Point(?,?),?)', [
//         row.point_x, row.point_y, '4326'
//       ]),
//       updated_at: knex.fn.now()
//     }).returning('id')
//       .then(id => {
//         row.layer_id = parseInt(id, 10);
//         return row;
//       });
//   }).map(row => {
//     return Promise.map(row.source_ids, id => {
//       return knex('layers_sources').insert({
//         source_id: id,
//         layer_id: row.layer_id
//       });
//     });
//   });
// };

//   return knex('layers').select('layer_detail_id', 'id').where({
//     layer_detail_type: 'cmoss',
//     data_date: '2011-01-01'
//   }).map(row => {
//     return knex('cmoss').del().where({
//       id: row.layer_detail_id
//     }).return(row);
//   }).map(row => {
//     return knex('layers').del().where({
//       id: row.id
//     });
//   }).return(cmoss).map(row => {
//     // Any Modifications here
//     row.site_use = row.site_use === null ? [] : row.site_use.split(', ');
//     row.source = row.source === null ? [] : row.source.split(', ');
//     row.address = _.startCase(row.address);
//     row.name = _.startCase(row.name);
//     return row;
//   }).map(row => {
//     return knex('cmoss').insert({
//       name: row.name,
//       address: row.address,
//       block: row.block,
//       lot: row.lot,
//       site_use: row.site_use,
//       updated_at: knex.fn.now()
//     }).returning('id').then(id => {
//       row.layer_detail_id = parseInt(id, 10);
//       return row;
//     });
//   }).map(row => {
//     return knex('layers').insert({
//       site_id: row.site_id,
//       geojson: row.geojson,
//       source: row.source,
//       data_date: '2011-01-01',
//       layer_detail_type: 'cmoss',
//       layer_detail_id: row.layer_detail_id,
//       geometry: knex.raw('ST_SetSRID(ST_Point(?,?),?)', [
//         row.point_x, row.point_y, '4326'
//       ]),
//       updated_at: knex.fn.now()
//     });
//   });
// };
