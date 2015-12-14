'use strict'

var should = require('should');
var AGM = require('../index.js');
var apiMocks  = require('./apiMocks')();

describe('agilemanager-api test suite', function () {

  var options = {
    clientId: 'admin',
    clientSecret: 'admin'
  };

  var agm = new AGM(options);

  describe('method login', function() {

    it('should return an auth token', function(done) {

      agm.login(function (err, body){

        should.not.exist(err);

        body.should.be.an.instanceof(Object).and.have.property('access_token');
        body.should.be.an.instanceof(Object).and.have.property('token_type');
        body.should.be.an.instanceof(Object).and.have.property('expires_in');
        body.should.be.an.instanceof(Object).and.have.property('scope');

        done();

      });
    });

  });

});