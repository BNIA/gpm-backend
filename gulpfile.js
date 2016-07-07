"use strict";
let requireDir = require('require-dir');
let paths = require('./config').paths;

// Require each file in the tasks folder
requireDir(paths.tasksRoot);
