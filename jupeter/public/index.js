let socket = io();

socket.on('connect', () => {
    console.log('Connected to server.');
    socket.emit('User Log-in', {
        ID: 'karockai',
        name : 'Yongki'
    });

    socket.on('Server Profile', (a) => {
        console.log(a);
    })
});
socket.on('disconnect', () => {
    console.log('Disconneted from server.');
});
