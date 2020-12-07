socket = new WebSocket("ws://192.168.0.102:8081");

socket.addEventListener('message', function(event) {
    vm.fillData(JSON.parse(event.data));
});

select.addEventListener('change', () => {
    socket.close();
});