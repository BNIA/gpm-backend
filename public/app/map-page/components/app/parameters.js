var baltimore = {
  lat: 39.2854197594374,
  lng: -76.61796569824219,
  zoom: 12
};

var esriWorldGrayCanvas = {
  tileLayer: 'http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
  tileLayerOptions: {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
  }};

var cartodbPositron = {
  tileLayer: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
  tileLayerOptions: {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    maxZoom: 19
  }};

var openstreetmapBlackAndWhite = {
  tileLayer: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
  tileLayerOptions: {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }};

var openmapsurferGrayscale = {
  tileLayer: 'http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}',
  tileLayerOptions: {
    maxZoom: 19,
    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }};

var hyddaFull = {
  tileLayer: 'http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png',
  tileLayerOptions: {
    attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }};

export {
  baltimore,
  esriWorldGrayCanvas,
  cartodbPositron,
  openstreetmapBlackAndWhite,
  openmapsurferGrayscale,
  hyddaFull
};
