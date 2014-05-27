var crypto = require('crypto'),
    User =  require('../model/User')
    ;
module.exports = function iosocket(i){

	i.sockets.on('connection', function (sckt){
		
		console.log('A socket from ' + sckt.handshake.address.address + ' connected!');
		
		
		sckt.on('login',function (data) {
			console.log(data);
                        var user = new User();
                        user.personid = crypto.createHash('md5').update(data.username+data.email).digest('hex').substr(0,8); 
                        user.nickname = data.username;
                        user.email = data.email;
                        user.save(function save_person(err,user){
                          if(err)return console.warn(err);

                          console.log('User Saved');
			  sckt.emit('login',{r:'ok',token:'token',username:data.username});
			  sckt.broadcast.emit('enter',{username: data.username});
                        });
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
