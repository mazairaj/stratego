// var server = require('http').Server(app);
// var io = require('socket.io')(server);

var util = require("util")
var io = require("socket.io");

var socket;
var currentPlayer;

function init() {
    players = [];
    setEventHandlers();
    socket = io.listen(3000);
};

var setEventHandlers = function() {
    socket.sockets.on("connection", onSocketConnection);
};

function onSocketConnection(client) {
    util.log("New player has connected: "+client.id);
    client.on("connect with game", startGame)
    client.on("update Game State", updateGameState);
};

function onClientDisconnect() {
    util.log("Player has disconnected: "+this.id);
};

function updateGameState(board) {
};

// server.listen(3000, function() {
//   console.log('Started, listening on port ', 3000);
// });
//
// io.on('connection', function (socket) {
//   console.log('connected');
//   socket.on('username', function(username) {
//     if (!username || !username.trim()) {
//       return socket.emit('errorMessage', 'No username!');
//     }
//     socket.username = String(username);
//   });



init();
