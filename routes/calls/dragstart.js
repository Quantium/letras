'use strict';
module.exports = function dragstart(io,socket){
		socket.on('dragstart',function (data) {
			console.log(data);
			//i.sockets.emit('dragstart',data);
			socket.broadcast.emit('dragstart',data);
		});
};
