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
	
async function request(cursor) {
	const promise = new Promise((resolve, reject) => {
			cursor.hasNext((errHasNext, hasNext) => {
				cursor.next((errNext, next) => {
					resolve(hasNext ? next : null);
				});
			});
		});
	
	return await promise;
}

function doSomething() {
	const db = client.db(dbName),
		  collection = db.collection(collectionName),
		  cursor = collection.find();

	async function doRequest() {
		for (let i = 0; i < 5; i++) {
			console.log(await request(cursor));
		}
	}

	doRequest();
}

client.connect(function(err) {
	assert.strictEqual(null, err);

	doSomething();
});