const ws = require('ws');

const server = new ws.Server({port: 3000});

server.on('connection', ws => {
    ws.send(Здравствуй);
    console.log("Подключён новый пользователь");
});