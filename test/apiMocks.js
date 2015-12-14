'use strict'
/**
 * Tests API Mocks resource
 * @module tests api mocks
 */

/**
 * Module dependencies.
 */
var nock = require('nock');

var apiMocks = function() {
	nock('https://agilemanager-ast.saas.hp.com')
		.post('/agm/oauth/token')
		.reply(200, { 
			access_token: '197247213_2639ed2e-6c73-4abg-7991-9872dbccf1',
			token_type: 'bearer',
			expires_in: 3599,
			scope: 'read trust write'
		});
};


module.exports = apiMocks;