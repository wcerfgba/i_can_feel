var browserify = require('browserify-middleware');
var express = require('express');
var app = express();

//provide browserified versions of all the files in the script directory
app.use('/js', browserify(__dirname + '/js'));

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT);