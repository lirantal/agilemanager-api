# agilemanager-api
HPE's Agile Manager client API module for NodeJS


# Example Use Case: Dashboard

Easily integrate with Agile Manager to create your very own dashboard UI:

![image](https://cloud.githubusercontent.com/assets/316371/11165523/68f54c78-8b1a-11e5-81f0-9ab988d5cdc5.png)


# Install

npm install agilemanager-api

# Setup

Prepare an options object with clientId and clientSecret keys from Agile Manager's configuration area:
```javascript
var options = {
	clientId: 'api_client_0000000_0',
	clientSecret: 'lknNSDASY6458ub'
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

Perform an AGM `agm.query(fn)` method on any type of resource.

The `agm.query(fn)` method expects an object with the following members:
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


## `resources` Example

Using the `agm.resources(fn)` method it's possible to perform CRUD operations directly on any type of supported [resources](https://github.com/lirantal/agilemanager-api#resources).

### Example of creating a user story:
```javascript
/**
 * Perform a query on a workspace and resource
 * Create a user story
 *
 * @param {object} resourceOptions - expect an object with the following:
 *   - workspaceId - the workspace id
 *   - resource - the type of resource to perform the action on (@see list of [resources](https://github.com/lirantal/agilemanager-api#resources)
 *   - method - one of: GET, POST, PUT, DELETE
 *   - data - an array of objects with the backlog item supported fields, allowing to create more than one backlog item with fie
 */

var resourceOptions = {
	workspaceId: '1000',
	resource: 'backlog_items',
	method: 'POST',
	data: [{
		name: 'New user story',
		subtype: 'user_story'
	}]
};

agm.resource(resourceOptions, function(err, body) {

	// Returned JSON response object in body looks as follows:
	//
	// { data: 
	//    [ { type: 'backlog_item',
	//        subtype: 'user_story',
	//        story_priority: null,
	//        num_of_tasks: null,
	//        cover_status: 'Not Covered',
	//        release_id: null,
	//        id: 1945,
	//        kanban_status_id: null,
	//        author: 'api_client_49871541_16',
	//        rank: 3610000,
	//        remaining: null,
	//        estimated: null,
	//        description: null,
	//        name: 'New user story',
	//        dev_comments: null,
	//        kan_status_duration: 0,
	//        blocked: null,
	//        application_id: null,
	//        kanban_parent_status_id: null,
	//        status: 'New',
	//        story_points: null,
	//        sprint_id: null,
	//        creation_date: '2015-11-09',
	//        kan_parent_duration: 0,
	//        last_modified: '2015-11-09T18:44:20Z',
	//        theme_id: null,
	//        team_id: null,
	//        invested: null,
	//        assigned_to: null,
	//        actual: null,
	//        archive_status: 0,
	//        feature_id: null } ],
	//   TotalResults: 1 }

        // Do more things with the body response object...
});
```
### Example of deleting a user story
Example of creating a user story:
```javascript
/**
 * Perform a query on a workspace and resource
 * Create a user story
 *
 * @param {object} resourceOptions - expect an object with the following:
 *   - workspaceId - the workspace id
 *   - resource - the type of resource to perform the action on (@see list of [resources](https://github.com/lirantal/agilemanager-api#resources)
 *   - method - one of: GET, POST, PUT, DELETE
 *   - data - an array of objects with the backlog item supported fields, allowing to create more than one backlog item with fie
 */

var resourceOptions = {
	workspaceId: '1000',
	resource: 'backlog_items',
	method: 'DELETE',
	entityId: '1945'
};

agm.resource(resourceOptions, function(err, body) {
        // Do more things with the body response object...
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
