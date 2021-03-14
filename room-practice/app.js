/* socket\room_chat\app.js */


const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.set('view engine', 'ejs');
app.set('views', './views');

// room의 종류를 정한다. 
let room = ['room1', 'room2'];
let a = 0;

// chat.ejs 를 만든다.
app.get('/', (req, res) => {
  res.render('chat');
});


io.on('connection', (socket) => {

  console.log('a user connect');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


  socket.on('leaveRoom', (num, name) => {
    
    let roomname = room[num];
    console.log("roomname : %s", roomname);

    socket.leave(room[num]);
    console.log("room change");
    console.log(name + ' leave a ' + room[num]);
    io.to(room[num]).emit('leaveRoom', num, name);
  });

  // joinroom 이벤트가 발생하면, num과 name을 받는다.
  socket.on('joinRoom', (num, name) => {
    console.log('join // num : %s, name : %s', room[num], name);

    socket.join(room[num]);
    console.log(name + ' join a ' + room[num]);
    // to는 해당 room에 event를 보내려는 목적이다. 
    io.to(room[num]).emit('joinRoom', num, name);

  });


  socket.on('chat message', (num, name, msg) => {
    a = num;
    io.to(room[a]).emit('chat message', name, msg);
  });
});


http.listen(3000, () => {
  console.log('Connect at 3000');
});