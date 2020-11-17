/*Цель: Определить предельную нагрузку на сервер.
Методика: Нужно разработать 2 скрипта, которые бы периодически открывали соединения с сервером. Каждый скрипт работает со своим протоколом. Используя эти скрипты, провести исследование того на сколько загружается сервер при предельной нагрузке с сохранением работоспособности.
Критерии работоспособности:

Отсутствие аварийного завершение клиентов и сервера.
Обновление данных происходит не реже 1 раза за 1,5 секунды(норма - 1 секунда). */

const config = require("../config");

const WebSocket = require("ws");

var countSocketsAddedPerOneTime = getProcessArgOrStd(2, 1000);
var intervalBetweenBuildNewSockets = getProcessArgOrStd(3, 2000);
function getProcessArgOrStd(argNum, stdVal){
    var value = process.argv[argNum];
    return value == undefined ? stdVal : value;
}

var currentTime = 0;
setInterval(() => {
    currentTime += 0.5;
}, 0.5);

const sockets = [];
function AddNewSockets(countSockets){
    for(var i = 0; i < countSockets; i++){
        var socket = buildSocket();
        sockets.push(socket);
    }
}

var countOverWaits = 0;

setInterval(() => {
    AddNewSockets(countSocketsAddedPerOneTime);
    console.log(sockets.length.toString() + " " + countOverWaits.toString());
}, intervalBetweenBuildNewSockets);

function buildSocket(){
    var socket = new WebSocket(config.siteDataSenderUrl);
    socket.onmessage = () => {
        var previousTime = currentTime;
        return () => {
            if(currentTime - previousTime >= 1,5){
                countOverWaits++;
            }
            previousTime = currentTime;
        }
    }
    return socket;
}