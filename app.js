
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

var addMinutes = require('./addMinutes');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, '')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req,res) {
    res.sendfile('index.html');
});

app.get('/api/addMinutes', function(req,res) {
    var queryParams = req.query;
    var result = addMinutes(queryParams.time, queryParams.delta);
    console.log(req.query, result);
    res.send(result.status, result.message);
});

app.all('*', function(req,res) {res.redirect('/')});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

