# agilemanager-api
HPE's Agile Manager client API module for NodeJS

[[toc]]

# Install

npm install agilemanager-api

# Setup

Prepare an options object with clientId and clientSecret keys from Agile Manager's configuration area:
```javascript
var options = {
	clientId: 'api_client_29861862_2',
	clientSecret: 'N8CbtgIFIV4F9Oa'
};
```

Require the `agilemanager-api` npm module after it was installed and instantiate the object with the prepared options:
```javascript
var AGM = require('agilemanager-api');
var agm = new AGM(options);
```

## `login` Example

Perform an AGM `login` method to authenticate the API and continue working with the rest of the methods available
```javascript
agm.login(function (err, body) {

  /** body is an object with the token information
   *
   * { 
   *   access_token: '197247213_2639ed2e-6c73-4abg-7991-9872dbccf1',
   *   token_type: 'bearer',
   *   expires_in: 3599,
   *   scope: 'read trust write'
   * }
   */ 
  
  // Do something with token...
});
```

## `query` Example

Perform an AGM `query` method on any type of resource.
The `query` method expects an object with the following members:
* workspaceId - the workspace id in AGM
* resource - the resource type, can be any one of the listed [resources](https://github.com/lirantal/agilemanager-api#resources) 
* query - the actual query to perform, accepting statements with ; char as a logical AND and || as logical OR
* fields - a list of specific fields to be filtered in the returned response
* orderBy - a field to order the results, by default results are of ascending order or with a prefix - symbol for decesending results (for example: `fields: -name`)
* limit and offset - both of these options allow to specify numbers for the purpose of paginated results

For example, to query for a list of backlog items, with id bigger than 2000, and getting back only the name field in the JSON response:
```javascript

// Prepare the query options object
var queryOptions = {
	workspaceId: '1000',
	resource: 'backlog_items',
	query: 'id>2000',
	fields: 'id,name',
	orderBy: 'name',
	limit: 10,
	offset: 0
};

// Call the query method using the 
agm.query(queryOptions, function(err, body) {
  /**
   * body contains a JSON object response with data member and TotalResults member:
   * {
   *  data: 
   *   [{
   *     type: 'backlog_item',
   *     subtype: 'defect',
   *     id: 2012,
   *     name: 'URL uploaded images are not cropped
   correctly'
   *   }],
   *  TotalResults: 1
   * }
   *
   *
   *
   */

  // Do something with body JSON object resopnse
});
```

# Agile Manager API Usage

## RESTful API

Agile Manager's API is RESTful and supports 

* GET fetch a new item
* POST creates a new item
* PUT updates an item
* DELETE removes an item

As can be illustrated in the following screenshot
![image](https://cloud.githubusercontent.com/assets/316371/11032700/45644dd2-86e6-11e5-918d-65226aa6aaee.png)

(image credit to HPE's Agile Manager API Intractive Help (beta)

## Resources
The API supports the following resources, which can be used as part of the `query` method:
* applications
* backlog_items
* backlog_item (attachments)
* features
* feature (attachments)
* release_teams
* releases
* release (attachments)
* sprints
* tasks
* team_members
* teams
* themes
* theme (attachments)
* workspaces


# Author
Liran Tal <liran.tal@gmail.com>
