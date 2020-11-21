var bdRequest = require('./DataBase')
var valueProcessor = require('./ServerWork')
var io = require('socket.io')(http);
const { isObject } = require('util');

var app = require('express')();
var http = require('http').createServer(app);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

var values;
setInterval(()=> {
    values = valueProcessor.processValues(bdRequest.Request());
}, 1000)

io.on('connect', (socket) => {
    setInterval(() => {
	    socket.emit('update', values);
    }, 1000);
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});

