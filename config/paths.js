var path = require('path');
var pwd = process.cwd();

var productionRoot = path.join(pwd, '/public');
var developmentRoot = path.join(pwd, '/src');
var serverRoot = path.join(pwd, '/server');
var tasksRoot = path.join(pwd, '/tasks');

exports.serverRoot = serverRoot;
exports.productionRoot = productionRoot;
exports.developmentRoot = developmentRoot;
exports.tasksRoot = tasksRoot;

exports.bundleSrc = 'main';
exports.bundleDest = path.join(productionRoot, '/build.js');

exports.configSrc = path.join(developmentRoot, '/config.js');
exports.configDest = productionRoot;

exports.lessSrc = [path.join(developmentRoot, '/**/*.less'),
  "!" + path.join(developmentRoot, '/{jspm_packages, jspm_packages/**}'),
  "!" + path.join(developmentRoot, '/shared/styles/colors.less')];
exports.lessDest = developmentRoot;

exports.optionsDest = path.join(pwd, '/server/options.json');
