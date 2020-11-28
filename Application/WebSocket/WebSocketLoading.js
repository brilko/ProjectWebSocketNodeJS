/*Цель: Определить предельную нагрузку на сервер.
Методика: Нужно разработать 2 скрипта, которые бы периодически открывали соединения с сервером. Каждый скрипт работает со своим протоколом. Используя эти скрипты, провести исследование того на сколько загружается сервер при предельной нагрузке с сохранением работоспособности.
Критерии работоспособности:

Отсутствие аварийного завершение клиентов и сервера.
Обновление данных происходит не реже 1 раза за 1,5 секунды(норма - 1 секунда). */

const { Console } = require("console");
const config = require("../config"),
      WebSocket = require("ws");

var countSocketsAddedPerOneTime = getProcessArgOrStd(2, 500);
var intervalBetweenBuildNewSockets = getProcessArgOrStd(3, 2000);

function getProcessArgOrStd(argNum, stdVal){
    var value = process.argv[argNum];
    return value == undefined ? stdVal : value;
}

const times = new Map();
let areAddingSockets = false;

function AddNewSockets(countSockets){
    areAddingSockets = true;

    for(var i = 0; i < countSockets; i++){
        buildSocket(i);
    }

    areAddingSockets = false;
}

let timeoutId = setTimeout(function callback() {
    AddNewSockets(countSocketsAddedPerOneTime);
    const firstSocket = times.values().next().value;

    if (firstSocket.maxtime != Number.MIN_VALUE) {
        console.log(`\nВремя превышено ${firstSocket.countOverWaits} раз ; максимальное время ${firstSocket.maxtime}`);
        firstSocket.maxtime = Number.MIN_VALUE;

        console.log('\n=============================================================');
    }

    console.log(`\nДобавлены ${countSocketsAddedPerOneTime} вебсокетов (Всего ${times.size})\n`);

    timeoutId = setTimeout(callback, intervalBetweenBuildNewSockets);
}, intervalBetweenBuildNewSockets);

function buildSocket(i){
    const socket = new WebSocket(config.siteDataSenderUrl);
    times.set(socket, { id: i, time: process.hrtime(),  countOverWaits: 0, maxtime: Number.MIN_VALUE });

    socket.onmessage = function(e) {
        if (areAddingSockets) {
            return;
        }

        const info = times.get(this),
              t = process.hrtime(info.time),
              time = t[1] / 1000000000 + t[0];

        info.maxtime = Math.max(info.maxtime, time);

        if (time > 1.5) {
            info.countOverWaits++;
        }

        if (info.id == 0) {
            console.log(`Время выполнения (${info.id}) = ${time} с`);
        }

        info.time = process.hrtime();
    };
}