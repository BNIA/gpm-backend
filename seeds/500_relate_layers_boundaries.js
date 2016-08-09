exports.seed = function(knex, Promise) {
  var csaQuery = knex.raw(
    'UPDATE ?? SET ?? = ??, ?? = ? FROM ??' +
    ' WHERE ST_CONTAINS(??, ??) AND ?? = ?',
    [
      'layers',
      'community_statistical_area_id',
      'boundary_detail_id',
      'updated_at',
      knex.fn.now(),
      'boundaries',
      'boundaries.geometry',
      'layers.geometry',
      'boundary_detail_type',
      'community_statistical_areas'
    ]
  ).toString();

  var nsaQuery = knex.raw(
    'UPDATE ?? SET ?? = ??, ?? = ? FROM ??' +
    ' WHERE ST_CONTAINS(??, ??) AND ?? = ?',
    [
      'layers',
      'neighborhood_statistical_area_id',
      'boundary_detail_id',
      'updated_at',
      knex.fn.now(),
      'boundaries',
      'boundaries.geometry',
      'layers.geometry',
      'boundary_detail_type',
      'neighborhood_statistical_areas'
    ]
  ).toString();

  var subwatershedQuery = knex.raw(
    'UPDATE ?? SET ?? = ??, ?? = ? FROM ??' +
    ' WHERE ST_CONTAINS(??, ??) AND ?? = ?',
    [
      'layers',
      'subwatershed_id',
      'boundary_detail_id',
      'updated_at',
      knex.fn.now(),
      'boundaries',
      'boundaries.geometry',
      'layers.geometry',
      'boundary_detail_type',
      'subwatersheds'
    ]
  ).toString();

  return knex.raw(csaQuery)
    .then(() => {
      return knex.raw(nsaQuery);
    }).then(() => {
      return knex.raw(subwatershedQuery);
    });
};
