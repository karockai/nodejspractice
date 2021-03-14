const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
let app = express();
app.use(express.static(publicPath));

let server = http.createServer(app).listen(3000, () => {
    console.log('Server is running....');
})

let io = socketIO(server);

io.on ('connection', (socket) => {
    console.log('A new browser has connected to this server.');

    socket.on('User Log-in', (user_profile) => {
        console.log(user_profile);
    })

    socket.emit('Server Profile', {
        server : 'main server',
        location : 'KAIST'
    });

    socket.on('disconnect', () => {
        console.log('The browser was disconnected.');
    })
})