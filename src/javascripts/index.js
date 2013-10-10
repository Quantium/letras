/**
 * SOCKET INITIALIZATION
**/
var chatlinelimit = 10;
var socket = io.connect('');
var username = '';
socket.on('login', function (data) {
	$('#login').hide('fast');
	$('#user_interface').show('fast');
	username = data.username;
	$('#welcome span#username').html(username);
	
});
socket.on('msg', function (data) {
	$('#chat').append('<div class="chat_message">'+
						'<span class="username" id="'+data.user+'">'+data.user+'</span>'+
						data.msg+
						'</div>');
});
/**
 * JQUERY DOCUMENT READY
**/
$(document).ready(function(){
	$('#user_interface').hide();
	$('#loginbtn').click(function(e) {
		var usrn = $('input#user').val();
		var eml = $('input#email').val();
		socket.emit('login',{username: usrn, email: eml});
        e.preventDefault();
    });
	$(".send").click(function(e) {
		var message = $('#message').val();
		socket.emit('msg',{msg: message,user:username});
		$('#message').val("");
		var chatl = $('#chat .chat_message').length;
		if(chatl >= chatlinelimit) {
			$('#chat .chat_message:lt(1)').remove();
		}
	});
});