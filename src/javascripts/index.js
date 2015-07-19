/**
 * SOCKET INITIALIZATION
**/
var chatlinelimit = 10;
var socket = io.connect('');
var username = '';
socket.on('login', function (data) {
	console.log('login');
	console.info(data);
	$('#login').hide('fast');
	$('#user_interface').show('fast');
	username = data.username;
	$('#welcome span#username').html(data.username);
	$('#usercount').html(data.usercount);

});
socket.on('msg', function (data) {
	console.log("Socket.On::msg");
	console.info(data);
	$('#chat').append('<div class="chat_message">'+
						'<span class="username" id="'+data.user+'">'+data.user+'</span>'+
						data.msg+
						'</div>');
});
socket.on('enter', function (data) {
	console.log("Socket.On::enter");
	console.info(data);
	$('#chat').append('<div class="notification">'+
						data.username+
						' enter the room</div>');
	$('#usercount').html(data.usercount);
});
/**
 * JQUERY DOCUMENT READY
**/
$(document).ready(function(){
	$('#user_interface').hide();
	$('#loginbtn').click(function(e) {
		var usrn = $('input#username').val();
		var eml = $('input#email').val();
		socket.emit('login',{username: usrn, email: eml});
        e.preventDefault();
    });
	$("#sendbtn").click(function(e) {
		e.preventDefault();
		var message = $('#message').val();
		socket.emit('msg',{msg: message});
		$('#message').val("");
		var chatl = $('#chat .chat_message').length;
		if(chatl >= chatlinelimit) {
			$('#chat .chat_message:lt(1)').remove();
		}
	});
});
