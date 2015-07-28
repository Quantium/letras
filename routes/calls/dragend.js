'use strict';
module.exports = function dragend(io,socket){
		socket.on('dragend',function (data) {
			console.log(data);
			//i.sockets.emit('dragend',data);
			socket.broadcast.emit('dragend',data);
		});
};
