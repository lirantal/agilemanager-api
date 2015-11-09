'use strict'

var _ 		= require('lodash');
var request = require('request');
var qs 		= require('querystring');

//var baseUrl = 'https://agilemanager-ast.saas.hp.com/';
var baseUrl = 'https://agilemanager-int.saas.hp.com/';
var actionUrl = {
	login: '/agm/oauth/token',
	workspaces: '/agm/api/workspaces'
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

/**
 * Submits a query request
 * AGM API allows open queries to be made on its internal database of items 
 * @param {number} workspaceId - workspace id as string
 * @param {string} resource - the resource to query, one of: backlog_items, releases, themes, tasks, sprints, release_teams, team_members
 * @param {string} query - the query to perform, in AGM API compatible syntax
 * @param {string} orderBy - the field to order by, use a leading minus sign (-) to refer to a descending ordering.
 * @param {number} limit - limit the response to N items
 * @param {number} offset - provide an offset for the limit to start from (useful for creating paginated responses). offset values require a limit value, otherwise are ignored completely.
 * 
 * @param {string} client_id
 * @param {string} client_secret 
 * @param {string} grant_type = set to the string 'client_credentials'
 *
 * @api public
 */
AGM.prototype.query = function(queryOptions, cb) {

	var uri = actionUrl.workspaces + '/' + queryOptions.workspaceId + '/' + queryOptions.resource;
	
	var uriQs = qs.stringify({
		query: queryOptions.query,
		orderBy: queryOptions.orderBy,
		limit: queryOptions.limit,
		offset: queryOptions.offset
	});

	// make a new request to gain access_token
	r({
		uri: uri + uriQs,
		method: 'GET',
		json: true
	}, function(error, response, body) {
		if (error) {
			return cb(new Error(error), null);
		} else if (response.statusCode === 200 && body.access_token) {
			return cb(null, self.token);
		} else {
			return cb(new Error(response.body), null);
		}
	});
};

module.exports = AGM;
