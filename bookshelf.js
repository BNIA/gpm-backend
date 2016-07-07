"use strict";
let pg = require('pg.js')();
module.exports = require('bookshelf')(pg);
