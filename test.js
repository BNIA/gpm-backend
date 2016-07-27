var rp = require('request-promise');
var options = {
  method: 'POST',
  uri: 'http://localhost:8080/layers/filter',
  body: {options: [1, 4, 3, 5]},
  json: true
};
rp(options)
  .then(parsedBody => {
    console.log(parsedBody);
  });

// var http = require('http');
// var querystring = require('querystring');
//
// var postData = querystring.stringify({options: [1, 4, 22, 33]});
//
// console.log(postData);
//
// var options = {
//   hostname: 'localhost',
//   port: '8080',
//   path: '/layers/filter',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Content-Length': Buffer.byteLength(postData)
//   }
// };
//
// var req = http.request(options, res => {
//   res.on('data', chunk => {
//     console.log(chunk);
//   });
//   res.setEncoding('utf8');
//   res.on('end', () => {
//     console.log("DONE");
//   });
// });
//
// req.on('error', e => {
//   console.log(`problem with request: ${e.message}`);
// });
//
// req.write(postData);
// req.end();
