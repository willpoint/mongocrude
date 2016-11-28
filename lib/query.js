var mongodb = require('mongodb');
var assert = require('assert');
var splitTasks = require('./utils').splitObjects;
var dbreg = /^\w+\:\/\//;

var _connect = function (databaseName, callback) {
	var defaultdb = 'mongodb://localhost:27017/'; 
	var url = dbreg.test(databaseName) ? databaseName : defaultdb + databaseName;

	mongodb.MongoClient.connect(url, function (err, database) {
		assert.equal(null, err);
		console.log('successfully connected to a mongodb instance');

		callback(database);

	})
}

var Database = exports = module.exports;

/**
*@param {string} databaseName  database name to perform insert
*@param {string} collectionName collection name 
*@param {object} doc Document to insert 
*@param {object} [options=null] Optional settings
*@param {number|string}
*/
Database.find = function (databaseName, collectionName, query, callback) {
	_connect(databaseName, function(database) {

		var collection = database.collection(collectionName);

		collection.find(query)
		
		.toArray(function(err, docs) {
			assert.equal(null, err);
			if (err) return callback(err);
			callback(null, docs);

			database.close();
		})
	})
}


/**
*@param {string} databaseName  database name to perform insert
*@param {string} collectionName collection name 
*@param {object} doc Document to insert 
*@param {object} [options=null] Optional settings
*@param {number|string}
*/
Database.findOne = function (databaseName, collectionName, query, callback){
	_connect(databaseName, function(database) {
		var collection = database.collection(collectionName);

		collection.find(query)
				.limit(query.limit)
				.toArray(function(err, docs){
			if (err) return callback(err);
			callback(null, docs);

			database.close();
		})
	})
}

/**
*@param {string} databaseName  database name to perform insert
*@param {string} collectionName collection name 
*@param {object} doc Document to insert 
*@param {object} [options=null] Optional settings
*@param {number|string}
*/
Database.createOne = function (databaseName, collectionName, doc, options, callback) {
	_connect(databaseName, function(database) {
		var collection = database.collection(collectionName);
		if (typeof options == 'function') callback = options, options = {};
		
		collection.insertOne(doc, function(err, done){
			assert.equal(null, err);
			if (err) return callback(err);
			callback(null, done);

			database.close();
		})
	})
}

/**
*@param {string} databaseName  database name to perform insert
*@param {string} collectionName collection name 
*@param {object[]} docs Document to insert is an array of objects
*@param {object} [options=null] Optional settings
*@return {Promise} returns Promise if no callback passed
*/
Database.createMany = function(databaseName, collectionName, doc, options, callback) {
	_connect(databaseName, function(database) {
		var collection = database.collection(collectionName);
		if (typeof options == 'function') callback = options, options = {};

		collection.insertMany(docs, options, function(err, done) {
			if (err) return callback(err);
			callback(null, done);

			database.close();
		})
	})
}


/**
*@param {string} databaseName  database name to perform insert
*@param {string} collectionName collection name 
*@param {object{}} queryTasks an object that takes at most 3 objects - 1-find, 2-update, 3-options eg. upsert: true the collection
*@param {object} [options=null] Optional settings
*@param {number|string}
*/
Database.updateOne = function(databaseName, collectionName, queryTasks, callback) {
	_connect(databaseName, function(database) {
		var collection = database.collection(collectionName);
		var tasks = splitTasks(queryTasks);

		collection.updateOne(tasks[0], task[1], task[2], function(err, res) {
			if (err) return callback(err);
			callback(null, res);

			database.close();
		})
	})
}

/**
*@param {string} databaseName  database name to perform insert
*@param {string} collectionName collection name 
*@param {object{}} query takes two objects - to find & update the collection
*@param {object} [options=null] Optional settings
*@param {number|string}
*/

Database.updateMany = function(databaseName, collectionName, queryTasks, callback) {
	_connect(databaseName, function(database) {
		var collection = database.collection(collectionName);
		var tasks = splitTasks(queryTasks);

		collection.updateMany(tasks[0], task[1], task[2], function(err, res) {
			if (err) return callback(err);
			callback(null, res);

			database.close();
		})
	})
}


/**
*@param {string} databaseName  database name to perform insert
*@param {string} collectionName collection name 
*@param {object{}} queryTasks an object that takes at most 3 objects - 1-find, 2-update, 3-options eg. upsert: true the collection
*@param {object} [options=null] Optional settings
*@param {number|string}
*/
Database.findOneAndUpdate = function(databaseName, collectionName, queryTasks, callback) {
	_connect(databaseName, function(database) {
		var collection = database.collection(collectionName);
		var tasks = splitTasks(queryTasks);

		collection.findOneAndUpdate(tasks[0], tasks[1], tasks[2], function(err, done) {
			if (err) return callback(err);
			callback(null, done);

			database.close();
		})
	})
}


/**
*@param {string} databaseName  database name to perform insert
*@param {string} collectionName collection name 
*@param {object{}} queryTasks an object that takes at most 3 objects - 1-find, 2-update, 3-options eg. upsert: true the collection
*@param {object} [options=null] Optional settings
*@param {number|string}
*/
Database.findOneAndDelete = function(databaseName, collectionName, queryTasks, callback) {
	_connect(databaseName, function(database) {
		var collection = database.collection(collectionName);
		var tasks = splitTasks(queryTasks);

		collection.findOneAndDelete(tasks[0], tasks[1], tasks[2], function(err, done) {
			if (err) return callback(err);
			callback(null, done);

			database.close();
		})
	})
}



/**
*@param {string} databaseName  database name to perform insert
*@param {string} collectionName collection name 
*@param {object{}} queryTasks an object that takes at most 3 objects - 1-find, 2-update, 3-options eg. upsert: true the collection
*@param {object} [options=null] Optional settings
*@param {number|string}
*/
Database.findOneAndReplace = function(databaseName, collectionName, queryTasks, callback) {
	_connect(databaseName, function(database) {
		var collection = database.collection(collectionName);
		var tasks = splitTasks(queryTasks);

		collection.findOneAndReplace(tasks[0], tasks[1], tasks[2], function(err, done) {
			if (err) return callback(err);
			callback(null, done);

			database.close();
		})
	})
}

/**
*@param {string} databaseName  database name to perform insert
*@param {string} collectionName collection name 
*@param {object} query First Document that matches the query is deleted
*@param {object} [options=null] Optional settings
*@param {number|string}
*/


Database.removeOne = function(databaseName, collectionName, query, callback) {
	_connect(databaseName, function(database) {
		var collection = database.collection(collectionName);
		collection.deleteOne(doc, function(err, done){
			if (err) return callback(err);
			callback(err, done);

			database.close();
		})
	})
}


/**
*@param {string} databaseName  database name to perform insert
*@param {string} collectionName collection name 
*@param {object} query all Documents that matche the query is deleted
*@param {object} [options=null] Optional settings
*@param {number|string}
*/
Database.removeMany = function(databaseName, collectionName, query, callback) {
	_connect(databaseName, function(database) {
		var collection = database.collection(collectionName);
		collection.deleteMany(query, function(err, done){
			if (err) return callback(err);
			callback(null, done);

			database.close();
		})
	})
}

/**
*@param {string} databaseName  database name to perform insert
*@param {string} collectionName collection name 
*@param {array}  docs An array of write operations to be performed
*@param {object} [options=null] Optional settings
*@param {number|string}
*/
Database.bulkWrite = function (databaseName, collectionName, docs, options, callback) {
	_connect(databaseName, function(database) {
		var collection = database.collection(collectionName);
		// doc is an array of several writes
		collection.bulkWrite(docs, options, function(err, res) {
			if (err) return callback(err);
			callback(null, res);

			database.close();
		})
	})
}

