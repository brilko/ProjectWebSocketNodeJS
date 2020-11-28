const socket = io('http://localhost:8081');

socket.on('values', (msg) => {
    vm.fillData(msg);
});