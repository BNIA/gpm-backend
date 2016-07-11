exports.seed = function(knex, Promise) {
  var csaQuery = knex.raw(
    'UPDATE ?? SET ?? = ??, ?? = CURRENT_TIMESTAMP FROM ?? ' +
    'LEFT JOIN ?? ON ?? = ?? WHERE ST_CONTAINS(??,??)',
    [
      'layers',
      'csa_id',
      'csas.id',
      'updated_at',
      'boundaries.csas',
      'boundaries',
      'csas.boundary_id',
      'boundaries.id',
      'boundaries.geometry',
      'layers.geometry'
    ]
  ).toString();

  var nsaQuery = knex.raw(
    'UPDATE ?? SET ?? = ??, ?? = CURRENT_TIMESTAMP FROM ?? ' +
    'LEFT JOIN ?? ON ?? = ?? WHERE ST_CONTAINS(??,??)',
    [
      'layers',
      'nsa_id',
      'nsas.id',
      'updated_at',
      'boundaries.nsas',
      'boundaries',
      'nsas.boundary_id',
      'boundaries.id',
      'boundaries.geometry',
      'layers.geometry'
    ]
  ).toString();

  var subwatershedQuery = knex.raw(
    'UPDATE ?? SET ?? = ??, ?? = CURRENT_TIMESTAMP FROM ?? ' +
    'LEFT JOIN ?? ON ?? = ?? WHERE ST_CONTAINS(??,??)',
    [
      'layers',
      'subwatershed_id',
      'subwatersheds.id',
      'updated_at',
      'boundaries.subwatersheds',
      'boundaries',
      'subwatersheds.boundary_id',
      'boundaries.id',
      'boundaries.geometry',
      'layers.geometry'
    ]
  ).toString();

  return knex.raw(csaQuery).then(() => {
    return knex.raw(nsaQuery);
  }).then(() => {
    return knex.raw(subwatershedQuery);
  });
};
