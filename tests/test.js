/*global describe:true, before:true, after: true, it:true */

'use strict';

var util = require('util')
  , path = require('path')
  , fs = require('fs')
  , should = require('chai').should()
  , request = require('supertest')
  , http = require('http');

var main = require('../app')
	, iosocket = require('../routes/iosocket');

describe('Main - app.js', function serverjs(){
	before(function(done){
		done();
	});
	it("Shouldn't be undefined", function(){
                main.should.be.an('object');
	});
});
describe('Socket - iosocket.js', function iosocketjs(){
	before(function(done){
		done();
	});
	it("Shouldn't be undefined", function(done){
		var express = require('express')
			, iosocket = require('../routes/iosocket')
			, http = require('http');
		var app = express();
		var server = http.createServer(app)
			,io = require('socket.io').listen(server);
		
                io.should.be.an('object');
                server.should.be.an('object');
                server.listen.should.be.a('function');
                iosocket.should.be.a('function');
		//assert.ok(iosocket(io));
                return done();
	});
	after(function(done){
		done();
	});
});
