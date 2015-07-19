module.exports = function disconnect(io,socket){
    socket.on('disconnect',function (data) {
        socket.usercount--;
    });
}
