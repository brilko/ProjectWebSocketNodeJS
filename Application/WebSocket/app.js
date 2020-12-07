const { StringDecoder } = require("string_decoder");

const WebSocketServer = new require('ws'),
	  MongoClient = require('mongodb').MongoClient,
	  assert = require('assert');

// ******************WebSocketServer********************
// клиент
class Client {
	constructor(ws) {
		this.ws = ws;
		this.timezone = 0;
	}
}

// подключённые клиенты
const clients = [];

let clientId = -1;

// WebSocket-сервер на порту 8081
const webSocketServer = new WebSocketServer.Server({
	port: 8081
});
// *******************************************************

// ***********************MongoDB*************************
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'sensor';

const collectionName = 'values';

// Create a new MongoClient
const mongoClient = new MongoClient(url, {useUnifiedTopology: true});
// *******************************************************

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

module.exports.request = request;

function findMaximums(values) {
	const maximums = [];

	let max = Number.MIN_VALUE;

	for (let i = 0; i < 500; i++) {
		let max = Number.MIN_VALUE;

		for (let k = 0; k < 200; k++) {
			max = Math.max(max, +values[i * 200 + k]);
		}

		maximums[i] = max;
	}

	return maximums;
}

module.exports.findMaximums = findMaximums;

mongoClient.connect(function(err) {
	assert.strictEqual(null, err);

	doSomething();
});

function doSomething() {
	const db = mongoClient.db(dbName),
		  collection = db.collection(collectionName),
		  cursor = collection.find();

	// http.createServer(function(request, response){

	// 	console.log(`Запрошенный адрес: ${request.url}`);
	// 	// получаем путь после слеша
	// 	let filePath = request.url.substr(1);

	// 	if (filePath == '') {
	// 		filePath = 'index.html';
	// 	}

	// 	// смотрим, есть ли такой файл
	// 	fs.access(filePath, fs.constants.R_OK, err => {
	// 		// если произошла ошибка - отправляем статусный код 404
	// 		if(err){
	// 			response.statusCode = 404;
	// 			response.end("Resourse not found!");
	// 		}
	// 		else{
	// 			fs.createReadStream(filePath).pipe(response);
	// 		}
	// 	});
	// }).listen(3000, function(){
	// 	console.log("Server started at 3000");
	// });

	webSocketServer.on('connection', function(ws) {
		clients[++clientId] = new Client(ws);
		console.log("новое соединение " + clientId);
	
		ws.on('close', function() {
			for (let i in clients) {
				if (clients[i].ws == this) {
					console.log('соединение закрыто ' + i);
					delete clients[i];
					break;
				}
			}
		});
	});

	let timeoutID = setTimeout(function doRequest() {
		request(cursor).then((doc) => {
			if (!doc) {
				mongoClient.close();
				return;
			}

			const values = doc.values,
				  maximums = findMaximums(values);

			for (let key in clients) {
				clients[key].ws.send(JSON.stringify(maximums));
			}

			timeoutID = setTimeout(doRequest, 1000);
		});
	}, 1000);
}