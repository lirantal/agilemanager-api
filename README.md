# agilemanager-api
HPE's Agile Manager client API module for NodeJS

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

Perform an AGM `login` method to authenticate the API and continue working with the rest of the methods available
```javascript
agm.login(function (err, body) {
  // Do something...
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
