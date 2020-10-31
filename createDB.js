const { Console } = require('console');

const MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	fs = require('fs');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'sensor';

const collectionName = 'values';

// Create a new MongoClient
const client = new MongoClient(url, {useUnifiedTopology: true});

const insertValues = function(collection, callback) {
	const lines = fs.readFileSync('data/visual_data_30_minutes.txt').toString().split("\n");

	lines.forEach((line, i) => {
		const firstSpace = line.indexOf(' '),
		tick = +line.slice(0, firstSpace),
		newLine = line.slice(firstSpace + 1),
		values = newLine.split(' ');

		collection.insertOne({"tick":tick, "values":values}, () => {
			if (i == lines.length - 1) {
				callback();
			}
		});
	});
};

// Use connect method to connect to the Server
client.connect(function(err) {
	assert.strictEqual(null, err);
	const db = client.db(dbName);
	db.createCollection(collectionName);
	const collection = db.collection(collectionName);

	insertValues(collection, () => {
		client.close();
	});
});