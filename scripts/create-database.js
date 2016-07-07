var path = require('path');
var knex = require('knex');
var config = require(path.join(process.cwd(), 'config'));
var connectionOptions = config.connectionOptions;

var createDatabase = function() {
  var user = connectionOptions.default.connection.user;
  var db = connectionOptions.default.connection.database;
  var pg = knex(connectionOptions.nodb);
  var query = "CREATE DATABASE \"" + db + "\" ";
  query += "OWNER " + user + " ";
  query += "TEMPLATE template0 ";
  query += "ENCODING 'utf8' ";
  query += ";";
  return pg.raw(query)
    .catch(err => {
      throw err;
    })
    .then(data => {
      return pg.destroy();
    })
    .then(() => {
      pg = require('knex')(connectionOptions.default);
      return pg.raw("CREATE EXTENSION postgis");
    })
    .then(() => {
      console.log("Created " + db + " successfully.");
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
  module.exports = createDatabase;
} else {
  createDatabase();
}
