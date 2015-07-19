var crypto = require('crypto'),
    User =  require('../../model/User')
    ;

module.exports = function login(io,socket){
    socket.on('login',function (data) {
        console.log(data);
        var user = new User();
        user.personid = crypto.createHash('md5').update(data.username+data.email).digest('hex').substr(0,8);
        socket.username = data.username;
        user.nickname = data.username;
        user.email = data.email;
        console.log('User :: ',user);
        user.save(function save_person(err,user){
          if(err)return console.warn(err);

          console.log('Saved :: ',user,socket.usercount);
          socket.emit('login',{r:'ok',token:'token',username:user.nickname,usercount:socket.usercount});
          socket.broadcast.emit('enter',{username: user.nickname,usercount:socket.usercount});
        });
    });
}
