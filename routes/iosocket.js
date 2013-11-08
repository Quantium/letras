module.exports = function iosocket(i){

	i.sockets.on('connection', function (sckt){
		
		console.log('A socket from ' + sckt.handshake.address.address + ' connected!');
		
		
		sckt.on('login',function (data) {
			console.log(data);
			sckt.emit('login',{r:'ok',token:'token',username:data.username});
			sckt.broadcast.emit('enter',{username: data.username});
		});
		
		sckt.on('msg',function (data) {
			console.log(data);
			//Se envía sólo al que envío el mensaje
			//sckt.emit('msg',data);
			//Se envía a todos los sockets conectados
			i.sockets.emit('msg',data);
		});
		
		sckt.on('dragstart',function (data) {
			console.log(data);
			//i.sockets.emit('dragstart',data);
			sckt.broadcast.emit('dragstart',data);
		});
		
		sckt.on('dragend',function (data) {
			console.log(data);
			//i.sockets.emit('dragend',data);
			sckt.broadcast.emit('dragend',data);
		});
		return true;
	});
};