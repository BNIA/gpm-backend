var _ = require('lodash');
var pgArray = require('postgres-array');

exports.seed = function(knex, Promise) {
  console.log('logging seed cmos duplicator, no data after this message');
  return knex('community_managed_open_spaces')
  .select([
    'site_id',
    'data_date',
    'layers.id',
    'layers.layer_detail_id'
  ])
  .leftJoin('layers', 'layer_detail_id', 'community_managed_open_spaces.id')
  .where({layer_detail_type: 'community_managed_open_spaces'})
  .then(rows => {
    var grouped = _.groupBy(rows, 'site_id');
    var dupes = _.reduce(grouped, (result, g) => {
      if (g.length <= 1) {
        return result;
      } else if (g.length > 1) {
        g = _.sortBy(g, 'data_date').reverse();
        result.push(g);
        return result;
      }
    }, []);
    var toUpdate = [];
    var toDelete = [];
    _.forEach(dupes, d => {
      var update = _.assign({}, d[0]);
      var rest = _.tail(d);
      update.replace_community_managed_open_spaces_ids = _.map(rest, r => {
        return r.layer_detail_id;
      });
      update.replace_layer_ids = _.map(rest, r => {
        return r.id;
      });
      toUpdate.push(update);
      _.forEach(rest, r => {
        toDelete.push(r);
      });
    });
    return [toUpdate, toDelete];
  }).spread((toUpdate, toDelete) => {
    return Promise.map(toUpdate, u => {
      return Promise.map(u.replace_community_managed_open_spaces_ids, id => {
        return knex('community_managed_open_spaces_site_uses')
          .update({
            community_managed_open_space_id: u.layer_detail_id
          }).where({
            community_managed_open_space_id: id
          });
      })
      .then(() => {
        return Promise.map(u.replace_layer_ids, id => {
          return knex('layers_sources')
            .update({
              layer_id: u.id
            }).where({
              layer_id: id
            });
        });
      });
    }).then(() => {
      var q = knex.raw(
        'DELETE FROM ?? ' +
        'WHERE ?? IN (' +
        'SELECT ?? FROM (' +
        'SELECT ??, ROW_NUMBER() OVER (' +
        'PARTITION BY ??, ?? ' +
        'ORDER BY ?? ' +
        ') AS ?? FROM ??' +
        ') ?? WHERE ?? > 1' +
        ')',
        [
          'community_managed_open_spaces_site_uses',
          'id',
          'id',
          'id',
          'site_use_id',
          'community_managed_open_space_id',
          'id',
          'rnum',
          'community_managed_open_spaces_site_uses',
          't',
          't.rnum'
        ]
      );
      return knex.raw(q.toString());
    }).then(() => {
      var q = knex.raw(
        'DELETE FROM ?? ' +
        'WHERE ?? IN (' +
        'SELECT ?? FROM (' +
        'SELECT ??, ROW_NUMBER() OVER (' +
        'PARTITION BY ??, ?? ' +
        'ORDER BY ?? ' +
        ') AS ?? FROM ??' +
        ') ?? WHERE ?? > 1' +
        ')',
        [
          'layers_sources',
          'id',
          'id',
          'id',
          'source_id',
          'layer_id',
          'id',
          'rnum',
          'layers_sources',
          't',
          't.rnum'
        ]
      );
      return knex.raw(q.toString());
    }).return([toUpdate, toDelete]);
  }).spread((toUpdate, toDelete) => {
    return Promise.map(toDelete, d => {
      return knex('community_managed_open_spaces')
        .del()
        .where({id: d.layer_detail_id})
        .return(d);
    }).map(d => {
      return knex('layers')
        .del()
        .where({id: d.id});
    }).return(toUpdate);
  });
};
