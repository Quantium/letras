/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname,'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);

var server = http.createServer(app)
   ,io = require('socket.io').listen(server);

server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection', function (socket){
	
	console.log('A socket from ' + socket.handshake.address.address + ' connected!');
	
	
	socket.on('login',function (data) {
		console.log(data);
		socket.emit('login',{r:'ok',token:'token',username:data.username});
		socket.broadcast.emit('enter',{username: data.username});
	});
	
	socket.on('msg',function (data) {
		console.log(data);
		//Se envía sólo al que envío el mensaje
		//socket.emit('msg',data);
		//Se envía a todos los sockets conectados
		io.sockets.emit('msg',data);
	});
	
	socket.on('dragstart',function (data) {
		console.log(data);
		//io.sockets.emit('dragstart',data);
		socket.broadcast.emit('dragstart',data);
	});
	
	socket.on('dragend',function (data) {
		console.log(data);
		//io.sockets.emit('dragend',data);
		socket.broadcast.emit('dragend',data);
	});
});
	
