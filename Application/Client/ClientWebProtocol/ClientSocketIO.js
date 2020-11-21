/**
 * Слушает сервер по протоколу SocketIO и считывает, отправляемые с него, значения. 
 * 
 * Не предоставляет API
 * 
 * Использует
 * GraphicUserInterface | Display(arrayValues)
 */

const socket = io();
var displayer = require('./GraphicUserUnterface')

socket.on('newValuesPortion', (values) => {
    displayer.display(values);
})

 