socket = io('http://localhost:8080');

socket.on('values', (msg) => {
    vm.fillData(msg);
});

select.addEventListener('change', () => {
    socket.close();
});