let count = process.argv[2];
count = Number(count);

if(Number.isNaN(count)) {
    count = 100;
}

console.log('count = ' + count);

const io = require('socket.io-client'),
      {performance} = require('perf_hooks');

const times = new Map();

let i = 0;
let areAddingSockets = true;

while(i < count) {
    const socket = io('http://127.0.0.1:8081');
    times.set(socket, { id: i, time: process.hrtime(),  countOverWaits: 0 });

    socket.on('values', function(values) {
        // console.log('Значения:\n' + values);
        if (areAddingSockets) {
            return;
        }

        const info = times.get(this),
                t = process.hrtime(info.time),
                time = t[1] / 1000000000 + t[0];

        if (time > 1.5) {
            info.countOverWaits++;
        }

        if (info.id == 0) {
            console.log(`Время выполнения (${info.id}) = ${time} с ; Не прошло по времени ${info.countOverWaits} раз`);
        }

        info.time = process.hrtime();
    });

    i++;
}

areAddingSockets = false;