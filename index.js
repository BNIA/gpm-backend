var dotenv = require('dotenv');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
dotenv.config();

var routes = require('./routes');
var layers = require('./routes/layers');
var stormwaters = require('./routes/stormwaters');
var boundaries = require('./routes/boundaries');
var csas = require('./routes/csas');
var nsas = require('./routes/nsas');
var subwatersheds = require('./routes/subwatersheds');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/layers', layers);
app.use('/layers/stormwaters', stormwaters);
app.use('/boundaries', boundaries);
app.use('/boundaries/csas', csas);
app.use('/boundaries/nsas', nsas);
app.use('/boundaries/subwatersheds', subwatersheds);

app.listen(process.env.PORT || 8080, () => {
  console.log('listening on port ' + (process.env.PORT || 8080));
});
