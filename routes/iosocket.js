'use strict';
var msg = require('./calls/msg'),
    login = require('./calls/login'),
    dragstart = require('./calls/dragstart'),
    dragend = require('./calls/dragend'),
    usercount = 0
    ;
module.exports = function iosocket(i){

	i.sockets.on('connection', function (socket){

		console.log('A socket from ' + socket.request.connection.remoteAddress + ' connected!');
        socket.usercount = usercount;
        login(i,socket);
        msg(i,socket);
        dragstart(i,socket);
        dragend(i,socket);

        socket.on('login',function login(e){
            usercount++;
            socket.usercount = usercount;
        });
        socket.on('disconnect',function (data) {
            usercount--;
            if(usercount < 0){
                usercount = 0;
            }
            socket.usercount = usercount;
        });

		return true;
	});
};
