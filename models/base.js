var Knex = require('knex');
var Bookshelf = require('bookshelf');
var dbConfig = require('../knexfile.js');

var bookshelf = new Bookshelf(new Knex(dbConfig.development));

// To avoid circular dependencies
bookshelf.plugin('registry');

module.exports = bookshelf;
