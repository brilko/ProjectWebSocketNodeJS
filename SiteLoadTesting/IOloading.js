let count = process.argv[2];
if(typeof count != 'number'){
    count = 10;
}
console.log('count = ' + count);
var io = require('socket.io-client');

let i = 0;
while(i < count){
    const socket = io('http://127.0.0.1:3000')
    socket.on('values', (values) => {
        console.log(values)
    })
    i++;
}


