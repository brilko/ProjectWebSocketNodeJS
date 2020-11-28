const mod = require('./app.js'),
            MongoClient = require('mongodb').MongoClient;

// ***********************MongoDB*************************
// Create a new MongoClient
// Connection URL
const url = 'mongodb://localhost:27017';

const mongoClient = new MongoClient(url, {useUnifiedTopology: true});
// *******************************************************


mongoClient.connect(function(err) {
	doSomething();
});


async function doSomething() {
    // Database Name
    const dbName = 'sensor';

    const collectionName = 'values';

	const db = mongoClient.db(dbName),
		  collection = db.collection(collectionName),
          cursor = collection.find();

    const promise = new Promise((resolve, reject) => {
        mod.request(cursor).then((doc) => {
            resolve(doc);
        });
    });

    return await promise;
}

module.exports.testDB = doSomething;