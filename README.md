# YES.com Node.JS Javascript API library

Develop Node.JS applications using radio now playing information gathered from thousands of broadcast and online stations through <http://api.yes.com/>.

## Download

### Download via Node Package Manager (NPM):

`npm install node-yesapi`

### Download via Git (first-time):

`git clone https://github.com/daball/node-yesapi.git`

### Download via Git (updates):

`git pull`

## Import API

### The NPM way

If you downloaded the source code manually, all of the API is completely contained in the api.js file.

`var yes = require('node-yesapi').v1;`

### Include manually in your project

If you downloaded the source code manually, all of the API is completely contained in the api.js file.

`var yes = require('./node-yesapi/api').v1;`

## Usage Instructions

Probably the best documentation is over at <http://api.yes.com>. But, here's how it basically works.

All API calls have a very simple overall structure: http://api.yes.com/{version}/{call}?{parameters}

####Arguments

#####version

Only version 1 is available currently.

#####call

One of the various API calls described below.

#####parameters

Each call has different parameters. 

The way this is implemented in node-yesapi is that `require('node-yesapi')` returns an object with a list of supported API versions. (Currently there is only one version of the API.) To select the only version of the API, use `require('node-yesapi').v1`.

That simplifies the overall URL structure to: http://api.yes.com/1/{call}?{parameters}

Now here's how to use the `v1` object. There are functions implemented for every API call documented at <http://api.yes.com>. They are also documented in the `api.js` source code comments. Some examples are shown below to show the general way the node-yesapi is used.

## Example API Calls

Using the same `yes` object returned above, these API calls are the same examples used on the official API documentation.

* `yes.station({ name: 'WFNX' }, function(data) { })`
* `yes.stations({ match: 'rock' }, function(data) { })`
* `yes.stations({ loc: 80202, genre: 'country' }, function(data) { })`
* `yes.stations({ genre: 'rock', mid: 10956639 }, function(data) { })`
* `yes.log({ name: 'KEXP' }, function(data) { })`
* `yes.log({ name: 'WFNX', ago: 1 }, function(data) { })`
* `yes.recent({ name: 'KEXP' }, function(data) { })`
* `yes.recent({ name: 'WFNX' }, function(data) { })`
* `yes.chart({ name: 'WFNX' }, function(data) { })`
* `yes.chart({ genre: 'Rock' }, function(data) { })`
* `yes.chart({ genre: 'Jazz', hot: 'fresh' }, function(data) { })`
* `yes.chart({ name: 'KEXP', date: '2008-08-08', genre: 'Punk' }, function(data) { })`
* `yes.media({ q: 'distur' }, function(data) { })`
* `yes.media({ aid: 10657 }, function(data) { })`
* `yes.media({ mid: 12812281 }, function(data) { })`
* `yes.related({ mid: 7040859 }, function(data) { })`

The API calls return immediately and you should provide a callback routine in the form of `function (data) { }`.

## About the Author

I'm David Ball, a software engineering student and IT professional. Visit my web site at <http://www.daball.me>.
