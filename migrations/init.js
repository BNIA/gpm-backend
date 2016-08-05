var createLayerDetailTypesTable = function(knex) {
  return knex.schema.createTable('layer_detail_types', table => {
    table.string('name').primary();
  });
};

var createLayerFilterTypesTable = function(knex) {
  return knex.schema.createTable('layer_filter_types', table => {
    table.string('name').primary();
  });
};

var createBmpTypesTable = function(knex) {
  return knex.schema.createTable('bmp_types', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
  });
};

var createDsgnDfcltsTable = function(knex) {
  return knex.schema.createTable('dsgn_dfclts', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
  });
};

var createFeasabilitiesTable = function(knex) {
  return knex.schema.createTable('feasabilities', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
  });
};

var createPrioritiesTable = function(knex) {
  return knex.schema.createTable('priorities', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
  });
};

var createRetroTypesTable = function(knex) {
  return knex.schema.createTable('retro_types', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
  });
};

var createSourcesTable = function(knex) {
  return knex.schema.createTable('sources', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
  });
};

var createSiteUsesTable = function(knex) {
  return knex.schema.createTable('site_uses', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
  });
};

var createStatusesTable = function(knex) {
  return knex.schema.createTable('statuses', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
  });
};

var createWtrshdBftsTable = function(knex) {
  return knex.schema.createTable('wtrshd_bfts', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
  });
};

var createLayersTable = function(knex) {
  return knex.schema.createTable('layers', table => {
    table.increments('id').primary();
    table.integer('layer_detail_id');
    table.string('layer_detail_type')
      .references('layer_detail_types.name').onDelete('CASCADE')
      .notNullable();
    table.integer('csa_id').references('csas.id')
      .onDelete('CASCADE');
    table.integer('nsa_id').references('nsas.id')
      .onDelete('CASCADE');
    table.integer('subwatershed_id').references('subwatersheds.id')
      .onDelete('CASCADE');
    table.integer('site_id').notNullable();
    table.specificType('geometry', 'geometry');
    table.json('geojson');
    table.timestamps();
    table.date('data_date');
  })
  .then(() => {
    return knex.raw(
      'ALTER TABLE layers ' +
      'ALTER COLUMN created_at ' +
      'SET DEFAULT CURRENT_TIMESTAMP'
    );
  });
};

var createLayersSourcesTable = function(knex) {
  return knex.schema.createTable('layers_sources', table => {
    table.increments('id').primary();
    table.integer('layer_id').references('layers.id').onDelete('CASCADE');
    table.integer('source_id').references('sources.id').onDelete('CASCADE');
  });
};

var createBoundariesTable = function(knex) {
  return knex.schema.createTable('boundaries', table => {
    table.increments('id').primary();
    table.integer('boundary_detail_id');
    table.specificType('boundary_detail_type', 'boundary_detail_type')
      .notNullable();
    table.string('name').notNullable(); // maybe not...
    table.json('geojson'); // .notNullable();
    table.specificType('geometry', 'geometry'); // .notNullable();
    table.timestamps();
  }).then(() => {
    return knex.raw(
      'ALTER TABLE boundaries ' +
      'ALTER COLUMN created_at ' +
      'SET DEFAULT CURRENT_TIMESTAMP'
    );
  });
};

var createStormwaterRemediationSitesTable = function(knex) {
  return knex.schema.createTable('stormwater_remediation_sites', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('address');
    // table.specificType('bmp_type_id', 'integer[]').references('bmp_type.id');
    table.string('site_use');
    table.float('drain_acres');
    table.float('imp_acres');
    table.float('imp_percent');
    table.float('an_runoff');
    table.integer('status_id').references('statuses.id')
      .onDelete('CASCADE');
    table.integer('retro_type_id').references('retro_types.id')
      .onDelete('CASCADE');
    table.integer('feasability_id').references('feasabilities.id')
      .onDelete('CASCADE');
    table.integer('dsgn_dfclt_id').references('dsgn_dfclts.id')
      .onDelete('CASCADE');
    table.integer('wtrshd_bft_id').references('wtrshd_bfts.id')
      .onDelete('CASCADE');
    table.integer('priority_id').references('priorities.id')
      .onDelete('CASCADE');
    table.timestamps();
  }).then(() => {
    return knex.raw(
        'ALTER TABLE stormwater_remediation_sites ' +
        'ALTER COLUMN created_at ' +
        'SET DEFAULT CURRENT_TIMESTAMP'
    );
  });
};

var createCommunityManagedOpenSpacesTable = function(knex) {
  return knex.schema.createTable('community_managed_open_spaces', table => {
    table.increments('id');
    table.string('name');
    table.string('address');
    table.string('block');
    table.string('lot');
    table.timestamps();
  }).then(() => {
    return knex.raw(
      'ALTER TABLE community_managed_open_spaces ' +
      'ALTER COLUMN created_at ' +
      'SET DEFAULT CURRENT_TIMESTAMP'
    );
  });
};

var createCommunityManagedOpenSpacesSiteUsesTable = function(knex) {
  return knex
  .schema.createTable('community_managed_open_spaces_site_uses', table => {
    table.increments('id').primary();
    table.integer('community_managed_open_space_id')
    .references('community_managed_open_spaces.id').onDelete('CASCADE');
    table.integer('site_use_id').references('site_uses.id').onDelete('CASCADE');
  });
};

var createBmpTypesStormwaterRemediationSitesTable = function(knex) {
  return knex.schema.createTable('bmp_types_stormwater_remediation_sites', table => {
    table.increments('id').primary();
    table.integer('stormwater_remediation_site_id').references('stormwater_remediation_sites.id')
      .onDelete('CASCADE');
    table.integer('bmp_type_id').references('bmp_types.id').onDelete('CASCADE');
  });
};

var createCsasTable = function(knex) {
  return knex.schema.createTable('csas', table => {
    table.increments('id');
    table.timestamps();
  })
    .then(() => {
      return knex.raw(
          'ALTER TABLE csas ' +
          'ALTER COLUMN created_at ' +
          'SET DEFAULT CURRENT_TIMESTAMP'
      );
    });
};

var createNsasTable = function(knex) {
  return knex.schema.createTable('nsas', table => {
    table.increments('id');
    table.timestamps();
  })
  .then(() => {
    return knex.raw(
      'ALTER TABLE nsas ' +
      'ALTER COLUMN created_at ' +
      'SET DEFAULT CURRENT_TIMESTAMP'
    );
  });
};

var createSubwatershedsTable = function(knex) {
  return knex.schema.createTable('subwatersheds',
      table => {
        table.increments('id');
        table.string("mde6name");
        table.string("mde8name");
        table.integer("mde8digt");
        table.integer("mde6digt");
        table.timestamps();
      })
  .then(() => {
    return knex.raw(
      'ALTER TABLE subwatersheds ' +
      'ALTER COLUMN created_at ' +
      'SET DEFAULT CURRENT_TIMESTAMP'
      );
  });
};

var createImagesTable = function(knex) {
  return knex.schema.createTable('images', table => {
    table.increments('id');
    table.string('public_id').notNullable();
    table.integer('layer_id').references('layers.id')
      .onDelete('CASCADE');
    table.timestamps();
  }).then(() => {
    return knex.raw(
      'ALTER TABLE images ' +
      'ALTER COLUMN created_at ' +
      'SET DEFAULT CURRENT_TIMESTAMP'
      );
  });
};

var createLayerFilterOptionsTable = function(knex) {
  return knex.schema.createTable('layer_filter_options', table => {
    table.increments('id').primary();
    table.string('layer_detail_type')
      .references('layer_detail_types.name')
      .onDelete('CASCADE');
    table.string('layer_filter_type')
      .references('layer_filter_types.name')
      .onDelete('CASCADE');
    table.integer('layer_filter_id');
  });
};

var createBoundaryDetailType = function(knex) {
  var q = knex.raw(
    'CREATE TYPE ?? as ENUM (?,?,?)', [
      'boundary_detail_type',
      'csas',
      'nsas',
      'subwatersheds'
    ]
  ).toString();
  return knex.raw(q);
};

exports.up = function(knex, Promise) {
  return Promise.all([
    createLayerDetailTypesTable(knex),
    createLayerFilterTypesTable(knex),
    createBmpTypesTable(knex),
    createDsgnDfcltsTable(knex),
    createFeasabilitiesTable(knex),
    createPrioritiesTable(knex),
    createRetroTypesTable(knex),
    createSiteUsesTable(knex),
    createWtrshdBftsTable(knex),
    createSourcesTable(knex),
    createStatusesTable(knex),
    createBoundaryDetailType(knex)
  ]).then(() => {
    return createBoundariesTable(knex);
  }).then(() => {
    return Promise.all([
      createCsasTable(knex),
      createNsasTable(knex),
      createSubwatershedsTable(knex)
    ]);
  }).then(() => {
    return createLayersTable(knex);
  }).then(() => {
    return createLayersSourcesTable(knex);
  }).then(() => {
    return createCommunityManagedOpenSpacesTable(knex);
  }).then(() => {
    return createCommunityManagedOpenSpacesSiteUsesTable(knex);
  }).then(() => {
    return createStormwaterRemediationSitesTable(knex);
  }).then(() => {
    return createBmpTypesStormwaterRemediationSitesTable(knex);
  }).then(() => {
    return createImagesTable(knex);
  }).then(() => {
    return createLayerFilterOptionsTable(knex);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bmp_types_stormwater_remediation_sites').then(() => {
    return knex.schema.dropTableIfExists('stormwater_remediation_sites');
  }).then(() => {
    return knex
    .schema.dropTableIfExists('community_managed_open_spaces_site_uses');
  }).then(() => {
    return knex.schema.dropTableIfExists('community_managed_open_spaces');
  }).then(() => {
    return knex.schema.dropTableIfExists('images');
  }).then(() => {
    return knex.schema.dropTableIfExists('layers_sources');
  }).then(() => {
    return knex.schema.dropTableIfExists('layers');
  }).then(() => {
    return knex.raw(knex.raw('DROP TYPE IF EXISTS ??', 'layer_detail_type')
      .toString());
  }).then(() => {
    return Promise.all([
      knex.schema.dropTableIfExists('csas'),
      knex.schema.dropTableIfExists('nsas'),
      knex.schema.dropTableIfExists('subwatersheds')]);
  }).then(() => {
    return knex.schema.dropTableIfExists('boundaries');
  }).then(() => {
    return knex.raw(knex.raw('DROP TYPE IF EXISTS ??', 'boundary_detail_type')
      .toString());
  }).then(() => {
    return Promise.all([
      knex.schema.dropTableIfExists('bmp_types'),
      knex.schema.dropTableIfExists('dsgn_dfclts'),
      knex.schema.dropTableIfExists('feasabilities'),
      knex.schema.dropTableIfExists('priorities'),
      knex.schema.dropTableIfExists('retro_types'),
      knex.schema.dropTableIfExists('site_uses'),
      knex.schema.dropTableIfExists('statuses'),
      knex.schema.dropTableIfExists('sources'),
      knex.schema.dropTableIfExists('wtrshd_bfts')
    ]);
  }).then(() => {
    return knex.schema.dropTableIfExists('layer_filter_options');
  }).then(() => {
    return Promise.all([
      knex.schema.dropTableIfExists('layer_filter_types'),
      knex.schema.dropTableIfExists('layer_detail_types')
    ]);
  });
};
