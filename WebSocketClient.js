const socket = new WebSocket('ws//localhost:3000');

socket.onopen = () => console.log("Соединение открыто");

socket.onclose = () => console.log("Соединение закрыто");

socket.onmessage = (message) => console.log(message);