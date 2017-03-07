var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

// var http = require('http')
// var io = require('socket.io');
var app = express();

// var server = http.Server(app);
// var websocket = io(server);
//
// websocket.on('connection', (socket) => {
//   console.log('A client just joined on', socket.id);
// });
//
// io.on('updateBoard', (newBoard) => {
//   // Save the message document in the `messages` collection.
//   // db.collection('messages').insert(message);
//
//   // The `broadcast` allows us to send to all users but the sender.
//   socket.broadcast.emit('updateBoard', board);
// });
// server.listen(3000, () => console.log('listening on *:3000'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

var newBoard;
var initialBoardLayout=[]
var isDefeated = false;
var winner;
if (!gameFull){
  console.log('in gamefull')
  var gameFull = false;
}
if (!numPlayers) {
  var numPlayers = 0
}
var spy = {value: 'S', team: 'red'}
var att = {value: 6, team: 'blue'}
var def = {value: 3, team: 'red'}
var bomb = {value: 'B', team: 'blue'}
var emptyBoard= [ ["", "","","","","","",""],
             ["", "","","","","","",""],
             ["", "","","","","","",""],
             ["", "","","","","","",""],
             ["", "","","","","","",""],
             ["", "","","","","","",""],
             ["", "","","","","","",""],
             ["", "","","","","","",""],
]
if (!board){
  console.log('in Set Board')
  var board = emptyBoard
}


if (!currentPlayer){
  console.log('in current Player')
  var currentPlayer = 'red';
}
var twoDCopy = function(arr, arrLen) {
  var copy = []
  for (let k = 0; k < arr.length; k++) {
    copy.push(arr[k].slice());
  }
  return copy
}
var transpose=function(arr,arrLen) {
  var copy = []
  for (let k = 0; k < arr.length; k++) {
    copy.push(arr[k].slice());
  }
  for (var i = 0; i < arrLen; i++) {
    for (var j = 0; j <i; j++) {
      //swap element[i,j] and element[j,i]
      var temp = copy[i][j];
      copy[i][j] = copy[j][i];
      copy[j][i] = temp;
    }
  }
  return copy;
}
var nextPlayer = function(){
  return (currentPlayer === 'red') ? 'blue' : 'red'
}
var updatePos = function(position1, position2){

  // console.log('update')
  console.log('1: ',position1)
  console.log('2: ', position2)
  initialPiece = board[position1.row][position1.col];
  board[position2.row][position2.col] = initialPiece;
  board[position1.row][position1.col] = "";
  // console.log(board);
  return board;

}
var battle = function(position1, position2) {
  var attacker = board[position1.row][position1.col];
  var defender = board[position2.row][position2.col];
  // console.log('attacker', attacker)
  // console.log('defender', defender)
  if (defender.piece === 'F') {
    isDefeated = true;

    var winner = (defender.team === 'red') ? 'blue':'red'
    return attacker.piece
  }
  if (defender.piece === 'B') {
    if(parseInt(attacker.piece) === 3) {
      board[position2.row][position2.col] = "";
      updatePos(position1, position2);
      return attacker.piece.toString()
    }else{
      board[position1.row][position1.col] = "";
      return defender.piece.toString()
    }
  }
  if (attacker.piece === 'S') {
    board[position2.row][position2.col] =  "";
    updatePos(position1, position2);
    return attacker.piece.toString()
  }
  if (defender.piece === 'S') {
    // console.log('spy defender')
    board[position2.row][position2.col] = "";
    updatePos(position1, position2);

    return attacker.piece.toString()
  }
  if (parseInt(attacker.piece) > parseInt(defender.piece)) {
    board[position2.row][position2.col] = "";
    updatePos(position1, position2);
    return attacker.piece.toString()
  } else {
    board[position1.row][position1.col] = "";
    return defender.piece.toString()
  }

}
var makeMove = function(position, direction, position2){
// console.log('direction:',direction)
  if (board[position.row][position.col].piece === '2') {
    if (board[position2.row][position2.col] === ""){
      updatePos(position, position2)
    }
    battle(position, position2)
  }
  if (direction === 'up') {
    console.log('up')
    if (board[position.row - 1][position.col] === "") {
      return updatePos({row: position.row, col: position.col},{row: position.row - 1, col: position.col});
    } else{
      return battle({row: position.row, col: position.col}, {row: position.row - 1, col: position.col})
    }
  }  if (direction === 'down') {
    console.log('down')
    if (board[position.row + 1][position.col] === "") {
      return updatePos({row: position.row, col: position.col},{row: position.row + 1, col: position.col});
    } else{
      return battle({row: position.row, col: position.col}, {row: position.row + 1, col: position.col})
    }
  }  if (direction === 'left') {
    console.log('left')
    if(board[position.row][position.col-1] === "") {
      return updatePos({row: position.row, col: position.col},{row: position.row, col: position.col - 1});
    } else{
      return battle({row: position.row, col: position.col}, {row: position.row , col: position.col - 1})
    }
  } if (direction === 'right') {
    console.log('right')
    if(board[position.row][position.col+1] === "") {
      return updatePos({row: position.row, col: position.col},{row: position.row, col: position.col + 1});
    } else{
      return battle({row: position.row, col: position.col}, {row: position.row, col: position.col + 1})
    }

  }
}
var checkClearPath = function(pos1, pos2, direction){
  console.log('step 2')
  if (direction === 'up'){
    console.log('step 3')
    pos1.row--;
    if (pos1.row !== pos2.row) {
      console.log('inside if statement')
      if (board[pos1.row][pos1.col] === ""){
        return checkClearPath(pos1 , pos2, direction);
      } else {
        return false;
      }
    } else {
      console.log('returning true')
      return true;
    }
  }

  if (direction === 'down'){
    console.log('step 3')
    pos1.row++;
    if (pos1.row !== pos2.row) {
      console.log('inside if statement')
      if (board[pos1.row][pos1.col] === ""){
        return checkClearPath(pos1 , pos2, direction);
      } else {
        return false;
      }
    } else {
      console.log('returning true')
      return true;
    }
  }

  if (direction === 'left'){
    console.log('step 3')
    pos1.col--;
    if (pos1.col !== pos2.col) {
      console.log('inside if statement')
      if (board[pos1.row][pos1.col] === ""){
        return checkClearPath(pos1 , pos2, direction);
      } else {
        return false;
      }
    } else {
      console.log('returning true')
      return true;
    }
  }
  if (direction === 'right'){
    console.log('step 3')
    pos1.col++;
    if (pos1.col !== pos2.col) {
      console.log('inside if statement')
      if (board[pos1.row][pos1.col] === ""){
        return checkClearPath(pos1 , pos2, direction);
      } else {
        return false;
      }
    } else {
      console.log('returning true')
      return true;
    }
  }
}
var checkValidMove=function(pos1,pos2) {
  if (board[pos1.row][pos1.col].piece !== '2') {
    if (pos2.row-pos1.row === 1 && pos2.col - pos1.col === 0) {
      return 'down'
    }
    if (pos2.row-pos1.row === -1 && pos2.col - pos1.col === 0) {
      return 'up'
    }
    if (pos2.col-pos1.col === 1 && pos2.row - pos1.row === 0) {
        return 'right'
      }
      if (pos2.col-pos1.col === -1 && pos2.row - pos1.row === 0) {
        return 'left'
    }

    return 'illegal move'
  } else {
    ogPos = {row: pos1.row, col: pos1.col}
    if ((pos2.row-pos1.row > 0) && (pos2.col - pos1.col === 0)) {
      var direction = 'down'
      console.log(direction)
      if (checkClearPath(ogPos,pos2, direction)){
        return direction
      }

    }
    if ((pos2.row-pos1.row < 0) && (pos2.col - pos1.col === 0)) {
      console.log('step 1')
      console.log(direction)
      var direction = 'up'
      if (checkClearPath(ogPos,pos2, direction)){
        console.log('returning', direction)
        return direction
      }
    }
    if ((pos2.col-pos1.col > 0) && (pos2.row - pos1.row === 0)) {
        var direction = 'right'
        console.log(direction)
        if (checkClearPath(ogPos,pos2, direction)){
          return direction
        }

      }
    if ((pos2.col-pos1.col < 0) && (pos2.row - pos1.row === 0)) {
        var direction = 'left'
        console.log(direction)
        if (checkClearPath(ogPos,pos2, direction)){
          return direction
        }
    }
  }
  console.log('iligal move');
  return 'illegal move'
}

app.get('/',function(req,res) {
  res.send('hello world')
})
app.post('/test', function(req, res){
  console.log('body', req.body)

  res.json({
    final: 'hey'

  })

})
app.get('/joingame', function(req, res){
  var team;


  // console.log('num ', numPlayers)
  if (!gameFull) {
    team = (numPlayers === 0 ? 'red' : 'blue')
    numPlayers++
    if (numPlayers === 2) {
      gameFull = true;
    }
  } else {
    team = 'Game is Full'
  }


  // if
  //   numPlayers = 1;
  //   res.json({
  //     myTeam: 'red'
  //   })
  // }
  //  if(numPlayers === 1 ){
  //   numPlayers = 2;
  //   res.json({
  //     myTeam: 'blue'
  //   })
  //   console.log('2 ',myTeam)
  // } else if (numPlayers = 2){
  //   res.json({
  //     myTeam: 'Game Full'
  //   })
  //   }
  res.json({
    myTeam: team
  })
  //   console.log('3', myTeam)
});

app.post('/stateupdate', function(req, res){

  // if (board[0][0] !== "" && board[7][7] !== "")
  //   var bd = req.body.reqBoard
  // board = transpose(board, 8);
  //console.log('BOARD:',board)
var x = board.slice()

  var returnBoard = transpose(x, 8);//transpose(board, 8);
  //console.log('transposed board::',returnBoard)
  var response = {board: returnBoard, currPlayer: currentPlayer};
  res.json(response)
});





app.post('/setupboard',function(req,res) {
  newBoard = req.body.board;
  //console.log('NEWBOARD B4 transpose', newBoard);
  var thisTeam = req.body.team;
  var boardTranspose = transpose(newBoard, 8);
  // console.log('BOARDTRANSPOSE ',boardTranspose)
  //console.log('after transpose:',newBoard)
  if (thisTeam === 'blue') {
    console.log('I AM TEAM ', thisTeam)
    board[0] = boardTranspose[0];
    board[1] = boardTranspose[1];
    board[2] = boardTranspose[2];
  } else if (thisTeam === 'red') {
    console.log('I AM TEAM ', thisTeam)
    board[5] = boardTranspose[5];
    board[6] = boardTranspose[6];
    board[7] = boardTranspose[7];
  }
  // console.log('This is the board After', board)
  var flipBoard = [...board]
  // console.log('Post setupboard ********', board)
  var newboardTranspose = (transpose(flipBoard, 8));

  // console.log('sending transpose::',newboardTranspose)

  res.json({board: newboardTranspose});
})


app.post('/makemove', function(req, res) {
  // console.log('in');
  // console.log('BOARD BEFORE MOVE IS MADE:',board)
  newBoard = req.body.board;
  boardTranspose = transpose(newBoard, 8);
  board = boardTranspose;
  var moves = req.body.move;
  var copyBoard = [...board];
  var pos2 = moves[1];
  var pos1 = moves[0];
  var direction = checkValidMove(pos1,pos2);
  if(direction==='illegal move') {
    copyBoard = transpose(copyBoard, 8)
    // console.log('COPY', copyBoard)
    res.json({
      board: copyBoard,
      currentPlayer: currentPlayer,
      move: [pos1]
    });
  };

  // console.log('legal move')
  makeMove(pos1,direction,pos2);

  var newboard = twoDCopy(board, 8);
  // console.log("New BOARD", newboard)
  var newboard2 = transpose(newboard, 8)
  var nextPlayerVal = nextPlayer();
  currentPlayer = nextPlayerVal;
  // console.log('MaDE MOVE', nextPlayerVal);
  res.json({
    board: newboard2,
    currentPlayer: nextPlayerVal,
    move: [],
    gameWon: isDefeated
  });
})

app.listen(process.env.PORT||3000)
