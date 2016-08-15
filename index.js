var dotenv = require('dotenv');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
dotenv.config();

var routes = require('./routes');

var env = process.env.NODE_ENV || 'development';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

if (env === 'production') {
  app.locals.prod = true;
  app.locals.dev = false;
} else if (env === 'development') {
  app.locals.prod = false;
  app.locals.dev = true;
}

app.use('/', routes.app);
app.use('/api/layers', routes.layers);
app.use('/api/layers/stormwaters', routes.stormwaters);
app.use('/api/layers/cmoss', routes.cmoss);
app.use('/api/boundaries', routes.boundaries);
app.use('/api/boundaries/csas', routes.csas);
app.use('/api/boundaries/nsas', routes.nsas);
app.use('/api/boundaries/subwatersheds', routes.subwatersheds);
app.use('/api/images', routes.images);
app.use('/api/layer-filter-options', routes.layerFilterOptions);
app.use('/api/boundary-filter-options', routes.boundaryFilterOptions);
app.use('/api/vital-signs', routes.vitalSigns);
app.use('/test', routes.test);

app.listen(process.env.PORT || 8080, () => {
  console.log('Running in ' + env + ' Mode');
  console.log('Listening on port ' + (process.env.PORT || 8080));
});
