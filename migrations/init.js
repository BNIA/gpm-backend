// Create the Layers Table
var createLayersTable = function(knex) {
  return knex.schema.createTable('layers', table => {
    table.increments('id');
    table.integer('csa_id').references('id')
      .inTable('boundaries.csas').onDelete('CASCADE');
    table.integer('nsa_id').references('id')
      .inTable('boundaries.nsas').onDelete('CASCADE');
    table.integer('subwatershed_id').references('id')
      .inTable('boundaries.subwatersheds').onDelete('CASCADE');
    table.integer('site_id').notNullable();
    table.specificType('source', 'layer_source').notNullable();
    table.specificType('geometry', 'geometry'); // .notNullable();
    table.json('geojson'); // .notNullable();
    table.timestamps();
  })
  .then(() => {
    return knex.raw(
      'ALTER TABLE layers ' +
      'ALTER COLUMN created_at ' +
      'SET DEFAULT CURRENT_TIMESTAMP'
    );
  });
};

// Create the Boundaries Table
var createBoundariesTable = function(knex) {
  knex.schema.createTable('boundaries', table => {
    table.increments('id');
    table.string('name').notNullable();
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

// Create the Layers Schema
var createLayersSchema = function(knex) {
  var q = knex.raw("CREATE SCHEMA IF NOT EXISTS ??", ["layers"])
    .toString();
  return knex.raw(q);
};

var createSwStatusType = function(knex) {
  var q = knex.raw(
    "CREATE TYPE ?? as ENUM (?,?)", [
      "layers.sw_status",
      'active',
      'identified'
    ]
  ).toString();
  return knex.raw(q);
};

var createBmpTypeType = function(knex) {
  var q = knex.raw(
    'CREATE TYPE ?? as ENUM (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
      'layers.bmp_type',
      'bioretention area',
      'culvert repair',
      'debris collector',
      'dry swale',
      'extended detention basin',
      'impervious cover removal',
      'improve bio-habitat',
      'landscape',
      'outfall retrofit',
      'permeable pavement',
      'shallow extended detention wetland',
      'shallow wetland',
      'site reforestation/revegetation',
      'stormwater pond/wetland system',
      'stream restoration',
      'underdrain',
      'underground detention system',
      'utility protection',
      'wetlands'
    ]).toString();
  return knex.raw(q);
};

var createRetroTypeType = function(knex) {
  var q = knex.raw(
    'CREATE TYPE ?? as ENUM (?,?)', ['layers.retro_type',
      'on site', 'storage'
    ]
  ).toString();
  return knex.raw(q);
};

var createFeasabilityType = function(knex) {
  var q = knex.raw(
    'CREATE TYPE ?? as ENUM (?,?,?,?,?)', [
      'layers.feasability',
      'low',
      'very low',
      'medium',
      'high',
      'very high'
    ]
    ).toString();
  return knex.raw(q);
};

var createDsgnDfcltType = function(knex) {
  var q = knex.raw(
    'CREATE TYPE ?? as ENUM (?,?,?,?,?)', [
      'layers.dsgn_dfclt',
      'low',
      'very low',
      'medium',
      'high',
      'very high'
    ]
  ).toString();
  return knex.raw(q);
};

var createWtrshdBftType = function(knex) {
  var q = knex.raw(
    'CREATE TYPE ?? as ENUM (?,?,?,?,?)', [
      'layers.wtrshd_bft',
      'low',
      'very low',
      'medium',
      'high',
      'very high'
    ]
  ).toString();
  return knex.raw(q);
};

var createPriorityType = function(knex) {
  var q = knex.raw(
    'CREATE TYPE ?? as ENUM (?,?,?,?,?)', [
      'layers.priority',
      'low',
      'very low',
      'medium',
      'high',
      'very high'
    ]
  ).toString();
  return knex.raw(q);
};

var createSiteUseType = function(knex) {
  var q = knex.raw(
    'CREATE TYPE ?? as ENUM (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
      'layers.site_use',
      'Active/Rectrational',
      'Adopt-a-Lot',
      'Art Inc.',
      'Beautification',
      'Children\'s Activities',
      'Conntected to Schools',
      'Container Garden',
      'Flower Beds',
      'Food Grown: Co-Op',
      'Food Grown: Individual Plots',
      'Food Grown: Organic',
      'Income Generating',
      'Memorial',
      'Rain Garden',
      'Trees',
      'Wildlife Habitat/Animals Kept'
    ]
  ).toString();
  return knex.raw(q);
};

var createLayerSourceType = function(knex) {
  var q = knex.raw(
    'CREATE TYPE ?? as ENUM (?,?,?,?,?,?,?)', [
      'layer_source',
      'Baltimore Green Space',
      'Baltimore City Master Gardeners',
      'Parks and People',
      'Power in Dirt',
      'Center for a Livable Future',
      'Growing Green Initiative',
      'DPW-MS4'
    ]
  ).toString();
  return knex.raw(q);
};

var createLayersTypes = function(knex, Promise) {
  return Promise.all([
    createLayerSourceType(knex)
  ]);
};

var createCmosTypes = function(knex, Promise) {
  return Promise.all([
    createSiteUseType(knex)
  ]);
};

var createCmosTable = function(knex) {
  return knex.schema.createTable('layers.cmoss', table => {
    table.increments('id');
    table.integer('layer_id').references('id').inTable('layers')
      .onDelete('CASCADE');
    table.string('name');
    table.string('address');
    table.string('block');
    table.string('lot');
    table.specificType('site_use', 'layers.site_use');
    table.timestamps();
  }).then(() => {
    return knex.raw(
      'ALTER TABLE layers.cmoss ' +
      'ALTER COLUMN created_at ' +
      'SET DEFAULT CURRENT_TIMESTAMP'
    );
  });
};

var createStormwaterTypes = function(knex, Promise) {
  return Promise.all([
    createSwStatusType(knex),
    createBmpTypeType(knex),
    createRetroTypeType(knex),
    createFeasabilityType(knex),
    createDsgnDfcltType(knex),
    createWtrshdBftType(knex),
    createPriorityType(knex)
  ]);
};

var createStormwaterTable = function(knex) {
  return knex.schema.createTable('layers.stormwaters', table => {
    table.increments('id');
    table.integer('layer_id').references('id').inTable('layers')
      .onDelete('CASCADE');
    table.string('name');
    table.string('address');
    table.specificType('status', 'layers.sw_status').notNullable();
    table.specificType('bmp_type', 'layers.bmp_type[]');
    table.string('site_use');
    table.float('drain_acres');
    table.float('imp_acres');
    table.float('imp_percent');
    table.float('an_runoff');
    table.specificType('retro_type', 'layers.retro_type');
    table.specificType('feasability', 'layers.feasability');
    table.specificType('dsgn_dfclt', 'layers.dsgn_dfclt');
    table.specificType('wtrshd_bft', 'layers.wtrshd_bft');
    table.specificType('priority', 'layers.priority');
    table.timestamps();
  }).then(() => {
    return knex.raw(
        'ALTER TABLE layers.stormwaters ' +
        'ALTER COLUMN created_at ' +
        'SET DEFAULT CURRENT_TIMESTAMP'
    );
  });
};

var dropLayersTypes = function(knex, Promise) {
  return Promise.all([
    knex.raw(knex.raw('DROP TYPE IF EXISTS ??', 'layer_source')
      .toString())
  ]);
};

var dropCmosTypes = function(knex, Promise) {
  return Promise.all([
    knex.raw(knex.raw('DROP TYPE IF EXISTS ??', 'layers.site_use')
      .toString())
  ]);
};

var dropStormwaterTypes = function(knex, Promise) {
  return Promise.all([
    knex.raw(knex.raw('DROP TYPE IF EXISTS ??', 'layers.sw_status')
      .toString()),
    knex.raw(knex.raw('DROP TYPE IF EXISTS ??', 'layers.bmp_type')
      .toString()),
    knex.raw(knex.raw('DROP TYPE IF EXISTS ??', 'layers.feasability')
      .toString()),
    knex.raw(knex.raw('DROP TYPE IF EXISTS ??', 'layers.dsgn_dfclt')
      .toString()),
    knex.raw(knex.raw('DROP TYPE IF EXISTS ??', 'layers.retro_type')
      .toString()),
    knex.raw(knex.raw('DROP TYPE IF EXISTS ??', 'layers.wtrshd_bft')
      .toString()),
    knex.raw(knex.raw('DROP TYPE IF EXISTS ??', 'layers.priority')
      .toString())
  ]);
};

// Create the Boundaries Schema
var createBoundariesSchema = function(knex) {
  return knex.raw("CREATE SCHEMA IF NOT EXISTS ??", [
    "boundaries"
  ]);
};

// Create the Csas Table
var createCsasTable = function(knex) {
  return knex.schema.createTable('boundaries.csas', table => {
    table.increments('id');
    table.integer('boundary_id').references('id').inTable(
        'boundaries').onDelete(
        'CASCADE');
    table.timestamps();
  })
    .then(() => {
      return knex.raw(
          'ALTER TABLE boundaries.csas ' +
          'ALTER COLUMN created_at ' +
          'SET DEFAULT CURRENT_TIMESTAMP'
      );
    });
};

var createNsasTable = function(knex) {
  return knex.schema.createTable('boundaries.nsas', table => {
    table.increments('id');
    table.integer('boundary_id').references('id').inTable(
        'boundaries').onDelete(
        'CASCADE');
    table.timestamps();
  })
  .then(() => {
    return knex.raw(
      'ALTER TABLE boundaries.nsas ' +
      'ALTER COLUMN created_at ' +
      'SET DEFAULT CURRENT_TIMESTAMP'
    );
  });
};

var createSubwatershedsTable = function(knex) {
  return knex.schema.createTable('boundaries.subwatersheds',
      table => {
        table.increments('id');
        table.string("mde6name");
        table.string("mde8name");
        table.integer("mde8digt");
        table.integer("mde6digt");
        table.integer('boundary_id').references('id').inTable('boundaries')
          .onDelete('CASCADE');
        table.timestamps();
      })
  .then(() => {
    return knex.raw(
      'ALTER TABLE boundaries.subwatersheds ' +
      'ALTER COLUMN created_at ' +
      'SET DEFAULT CURRENT_TIMESTAMP'
      );
  });
};

var createImagesTable = function(knex) {
  return knex.schema.createTable('images', table => {
    table.increments('id');
    table.string('public_id').notNullable();
    table.integer('layer_id').references('id').inTable('layers')
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

exports.up = function(knex, Promise) {
  return Promise.all([
    createBoundariesTable(knex),
    createBoundariesSchema(knex)
  ])
  .then(() => {
    return Promise.all([
      createCsasTable(knex),
      createNsasTable(knex),
      createSubwatershedsTable(knex)
    ]);
  }).then(() => {
    return createLayersSchema(knex);
  }).then(() => {
    return createLayersTypes(knex, Promise);
  }).then(() => {
    return createLayersTable(knex);
  }).then(() => {
    return createCmosTypes(knex, Promise);
  }).then(() => {
    return createCmosTable(knex);
  }).then(() => {
    return createStormwaterTypes(knex, Promise);
  }).then(() => {
    return createStormwaterTable(knex);
  }).then(() => {
    return createImagesTable(knex);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('layers.stormwaters')
  .then(() => {
    return dropStormwaterTypes(knex, Promise);
  }).then(() => {
    return knex.schema.dropTableIfExists('layers.cmos');
  }).then(() => {
    return dropCmosTypes(knex, Promise);
  }).then(() => {
    return knex.schema.dropTableIfExists('images');
  }).then(() => {
    return knex.schema.dropTableIfExists('layers');
  }).then(() => {
    return dropLayersTypes(knex, Promise);
  }).then(() => {
    var q = knex.raw('DROP SCHEMA IF EXISTS ??', ['layers']).toString();
    return knex.raw(q);
  }).then(() => {
    return Promise.all([
      knex.schema.dropTableIfExists('boundaries.csas'),
      knex.schema.dropTableIfExists('boundaries.nsas'),
      knex.schema.dropTableIfExists(
            'boundaries.subwatersheds')]);
  }).then(() => {
    var q = knex.raw('DROP SCHEMA IF EXISTS ??', ['boundaries']).toString();
    return knex.raw(q);
  }).then(() => {
    return knex.schema.dropTableIfExists('boundaries');
  });
};
