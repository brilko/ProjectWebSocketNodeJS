let select,
    socket;

window.addEventListener('DOMContentLoaded', () => {
    select = document.querySelector('select');
    let script = document.createElement('script');

    select.options[0].selected = true;
    script.src = 'http://localhost:3000/WebSocketVersion.js';
    document.body.append(script);
    
    select.addEventListener('change', () => {
        document.body.removeChild(script);  
        script = document.createElement('script');

        if (select.options[0].selected) {
            script.src = 'http://localhost:3000/WebSocketVersion.js';
        }
        else
        {
            script.src = 'http://localhost:3000/SocketIoVersion.js';
        }

        document.body.append(script);
    });
});