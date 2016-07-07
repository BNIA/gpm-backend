// Load in the connection options from the environment
// TODO: Use a connection string instead?
var port = process.env.PG_PORT || '5432';
var user = process.env.PG_USER || 'poco';
var password = process.env.PG_PASS || 'Seldon12';
var host = process.env.PG_HOST || 'localhost';
var database = process.env.PG_DATABASE || 'green-pattern-map';

module.exports = {
  default: {
    client: 'pg', connection: {
      port,
      user,
      password,
      host,
      database
    }
  },
  nodb: {
    client: 'pg', connection: {
      port,
      user,
      password,
      host
    }
  }
};
// var connectionNoDb = {client: 'pg', connection: {}};
// connectionNoDb.connection.port = process.env.PG_PORT || '5432';
// connectionNoDb.connection.user = process.env.PG_USER || 'poco';
// connectionNoDb.connection.password = process.env.PG_PASS || 'Seldon12';
// connectionNoDb.connection.host = process.env.PG_HOST || 'localhost';
//
// var connection = {client: 'pg', connection: {}};
// connection.connection.port = process.env.PG_PORT || '5432';
// connection.connection.user = process.env.PG_USER || 'poco';
// connection.connection.password = process.env.PG_PASS || 'Seldon12';
// connection.connection.host = process.env.PG_HOST || 'localhost';
// connection.connection.database = process.env.database || 'green-pattern-map';
//
// exports.connectionNoDb = connectionNoDb;
// exports.connection = connection;
