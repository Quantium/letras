var assert = require("assert")
	, http = require('http');

var main = require('../app')
	, iosocket = require('../routes/iosocket');

describe('Main - app.js', function serverjs(){
	before(function(done){
		done();
	});
	it("Shouldn't be undefined", function(){
		assert.ok(main);
	});
});
describe('Socket - iosocket.js', function iosocketjs(){
	before(function(done){
		done();
	});
	it("Shouldn't be undefined", function(){
		var express = require('express')
			, iosocket = require('../routes/iosocket')
			, http = require('http');
		var app = express();
		var server = http.createServer(app)
			,io = require('socket.io').listen(server);
		
		assert.ok(io);
		assert.ok(server);
		assert.ok(server.listen);
		assert.ok(iosocket);
		//assert.ok(iosocket(io));
	});
	after(function(done){
		done();
	});
});