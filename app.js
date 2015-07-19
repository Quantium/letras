var express = require('express')
  , routes = require('./routes')
  , iosocket = require('./routes/iosocket')
  , http = require('http')
  , path = require('path');

var app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('asdfñlkjasdfñlkjasdf'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname,'public')));
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}
app.get('/', routes.index);

var server = http.createServer(app)
   ,io = require('socket.io').listen(server);

server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

iosocket(io);
