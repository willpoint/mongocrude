# mongocrude

Mongocrude is a [MongoDB](http://www.mongodb.org/) query tool designed to work in an asynchronous environment while abstracting away the complexities of connecting and querying with great control of the database objects. It brings flexibility to [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete operations), so you can pick the database and collection name at the instance of your query and pass a callback to use the results to drive the logic powering your application.

### Install

```
$ npm install mongocrude
```

## API

```
var mongocrude = require('mongocrude')
```
This middleware gives direct access to the your database with a simple abstraction and api to reduce bugs and complexities. It supports all CRUD operations currently supported by MongoDB and includes actions such as `bulkwrite` without losing the strong benefits of mongodb.


## Example


```js
var db = require('mongocrude')
var uri = "mongodb://localhost:27017/app";
var assert = require('assert');

db.createOne(uri, 'users', {name: "vim"}, function(err, res){
	if (err) throw new Error("some errors" + err);
	
	db.findOne(uri, 'users', function(err, user) {
		// throw err;
		assert.equal(user.name, "vim")
		})

})
```

## operations supported
```
find,
findOne,
createOne, 
createMany,
updateOne, 
updateMany,
removeOne,
findOneAndDelete,
findOneAndRemove,
findOneAndReplace,
findOneAndUpdate,
bulkWrite ...
```

[MIT](LICENSE)
