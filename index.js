var dotenv = require('dotenv');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
dotenv.config();

var routes = require('./routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes.home);
app.use('/layers', routes.layers);
app.use('/layers/stormwaters', routes.stormwaters);
app.use('/layers/cmoss', routes.cmoss);
app.use('/boundaries', routes.boundaries);
app.use('/boundaries/csas', routes.csas);
app.use('/boundaries/nsas', routes.nsas);
app.use('/boundaries/subwatersheds', routes.subwatersheds);
app.use('/images', routes.images);
app.use('/layer-filter-options', routes.layerFilterOptions);
app.use('/test', routes.test);

app.listen(process.env.PORT || 8080, () => {
  console.log('listening on port ' + (process.env.PORT || 8080));
});
