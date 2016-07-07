// # Base Model
// This is the model from which all other models extend in this app
var path = require('path');
var conn = require(path.join(process.cwd(), 'config')).connection;
var pg = require('knex')(conn);
var myBookshelf = require('bookshelf')(pg);

myBookshelf.Model = myBookshelf.Model.extend({
  initialize: function initialize(opts = {}) {},
  toJSON: function toJSON(opts = {}) {}
});

module.exports = myBookshelf;
