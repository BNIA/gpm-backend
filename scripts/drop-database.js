var path = require('path');
var knex = require('knex');
var config = require(path.join(process.cwd(), 'config'));
var connectionOptions = config.connectionOptions;

var dropDatabase = function() {
  var db = connectionOptions.default.connection.database;
  var pg = knex(connectionOptions.nodb);
  var query = "DROP DATABASE IF EXISTS \"" + db + "\"";
  return pg.raw(query)
    .then(() => {
      console.log("Dropped " + db + " successfully.");
    })
    .catch(err => {
      throw err;
    })
    .finally(() => {
      return pg.destroy();
    });
};

// If called from node, execute function. Otherwise export function.
if (module.parent) {
  module.exports = dropDatabase;
} else {
  dropDatabase();
}
