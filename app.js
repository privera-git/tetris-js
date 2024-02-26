var express = require('express');
var app = express();

const path = require('path');

app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.use(express.static('public'))

app.listen(33033, function () {
  console.log('Example app listening on port 33033!');
});