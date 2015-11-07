'use strict'

var _ 		= require('lodash');
var request = require('request');

//var baseUrl = 'https://agilemanager-ast.saas.hp.com/';
var baseUrl = 'https://agilemanager-int.saas.hp.com/';
var actionUrl = {
	login: '/agm/oauth/token'
};

var r = request.defaults({
	baseUrl: baseUrl,
	proxy: ''
});

/** 
 * AGM Object
 *
 * @param {object} options
 * 		required:
 *	 		clientId - client API key
 *			clientSecret - client API secret
 * 		optional:
 *			apiUrl - the base URL to make API requests, otherwise a default is used
 */
var AGM = function(options) {

	if (!options.clientId || !options.clientSecret) {
		return new Error("no clientId or clientSecret settings provided in options object");
	}

	this.clientId = options.clientId;
	this.clientSecret = options.clientSecret;

	if (options.apiUrl) {
		this.apiUrl = options.apiUrl;
	}

};

/**
 * Submits a login authentication request
 * Uses content-type set to 'application/x-www-form-urlencoded'
 * 
 * @param {string} client_id
 * @param {string} client_secret 
 * @param {string} grant_type = set to the string 'client_credentials'
 *
 * @api public
 */
AGM.prototype.login = function(cb) {

	// check first if we already have an access_token before making a login request
	if (_.has(this, 'token.access_token')) {
		console.log('found token');
		return cb(null, this.token);
	} else {

		console.log('not found token, trying to get it');
		var self = this;

		// make a new request to gain access_token
		r({
			uri: actionUrl.login,
			method: 'POST',
			form: {
				client_id: this.clientId,
				client_secret: this.clientSecret,
				grant_type: 'client_credentials'
			},
			json: true
		}, function(error, response, body) {
			if (error) {
				return cb(new Error(error), null);
			} else if (response.statusCode === 200 && body.access_token) {
				self.token = {
					access_token: body.access_token,
					token_type: body.token_type,
					expires_in: body.expires_in,
					scope: body.scope
				}
				return cb(null, self.token);
			} else {
				return cb(new Error(response.body), null);
			}
		});
	}

}

AGM.prototype.get = function() {
};

module.exports = AGM;
