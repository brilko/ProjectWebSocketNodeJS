const socket = new WebSocket("ws://192.168.0.102:8081");

socket.onmessage = function(event) {
    vm.fillData(JSON.parse(event.data));
};