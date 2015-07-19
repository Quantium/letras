
module.exports = function msg(io,socket){
    socket.on('msg',function (data) {
        console.log(data);
        //Se envía sólo al que envío el mensaje
        //sckt.emit('msg',data);
        //Se envía a todos los sockets conectados
        data.user = socket.username;
        io.sockets.emit('msg',data);
    });
};
