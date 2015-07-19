var msg = require('./calls/msg'),
    login = require('./calls/login'),
    dragstart = require('./calls/dragstart'),
    dragend = require('./calls/dragend')
    ;
module.exports = function iosocket(i){

	i.sockets.on('connection', function (socket){

		console.log('A socket from ' + socket.handshake.address.address + ' connected!');
        socket.usercount = 0;
        login(i,socket);
        msg(i,socket);
        dragstart(i,socket);
        dragend(i,socket);

		return true;
	});
};
