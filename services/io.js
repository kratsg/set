var io = require('socket.io')();

io.on('connection', function (socket) {
    socket.on('subscribe', function(){
        console.log("A new user joined.");
    });

});

module.exports = io;

