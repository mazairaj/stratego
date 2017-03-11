import React, {Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  NavigatorIOS,
  AlertIOS,
  ListView,
  Alert,
  Image,
  ScrollView,
  ImagePickerIOS
} from 'react-native'

var _ = require('underscore');

var PIECES = {
  'F':	1,
  'B':	2,
  'S':	1,
  '2':	4,
  '3':	2,
  '4':	2,
  '5':	3,
  '6':	2,
  '7':	2,
  '8':	2,
  '9':	2,
  '10': 1
}

// This is the root view
var myFirstRN = React.createClass({
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Stratizons,
          title: "Stratizons"
        }}
        style={{flex: 1}}
      />
    );
  }
});

const Rules = React.createClass({
  roles() {
    this.props.navigator.push({
      component: Roles,
      title: "Roles",
    })
  },
  rulesshortcut() {
    this.props.navigator.push({
      component: Rulesshortcut,
      title: "Rules"
    });
  },
  gameplay() {
    this.props.navigator.push({
      component: Gameplay,
      title: "Game Play"
    })
  },
  render: function(){
    return (
      <ScrollView scrollsToTop={true}>
        <View style={styles.container}>
          <Image
            style={{width: 375, height: 220, resizeMode: 'contain'}}
            source={require('./img/rulesgame1.png')}></Image>
          <Image
            style={{width: 375, height: 270, resizeMode: 'contain'}}
            source={require('./img/1a.png')}></Image>
          <TouchableOpacity style={[styles.button2, styles.buttonBlue]} onPress={this.rulesshortcut}>
          <Image
          style={{height: 40, resizeMode: 'contain'}}
          source={require('./img/rulesshortcut.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button2, styles.buttonPink]} onPress={this.gameplay}>
            <Image
              style={{height: 40, resizeMode: 'contain'}}
              source={require('./img/gameplay.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.roles} style={[styles.button2, styles.buttonGreen]}>
          <Image
          style={{height: 40, resizeMode: 'contain'}}
          source={require('./img/roles.png')}></Image>
          </TouchableOpacity>
        </View>
      </ScrollView>
  )}
});

var Roles = React.createClass({
  render() {
    return (
      <ScrollView scrollsToTop={true}>
        <View style={styles.container4}>
          <Image
            style={{width: 360, height: 250, resizeMode: 'contain'}}
            source={require('./img/2a.png')}></Image>
          <Image
            style={{width: 370, height: 350, resizeMode: 'contain'}}
            source={require('./img/3.png')}></Image>
          <Image
            style={{width: 360, height: 330, resizeMode: 'contain'}}
            source={require('./img/4a.png')}></Image>
          <Image
            style={{width: 365, height: 350, resizeMode: 'contain'}}
            source={require('./img/5.png')}></Image>
          <Image
            style={{width: 365, height: 300, resizeMode: 'contain'}}
            source={require('./img/6a.png')}></Image>
          <Image
            style={{width: 365, height: 300, resizeMode: 'contain'}}
            source={require('./img/7a.png')}></Image>
          <Image
            style={{width: 365, height: 300, resizeMode: 'contain'}}
            source={require('./img/8a.png')}></Image>
        </View>
      </ScrollView>
    )}
  });

var Gameplay = React.createClass({
  render() {
    return (
      <ScrollView scrollsToTop={true}>
        <View style={styles.container4}>
          <Image
            style={{width: 365, height: 360, resizeMode: 'contain'}}
            source={require('./img/9.png')}></Image>
          <Image
            style={{width: 365, height: 350, resizeMode: 'contain'}}
            source={require('./img/10.png')}></Image>
        </View>
      </ScrollView>
    )}
  });

  var Rulesshortcut = React.createClass({
    render() {
      return (
        <ScrollView scrollsToTop={true}>
          <View style={styles.container4}>
            <Image
              style={{width: 365, height: 400, resizeMode: 'contain'}}
              source={require('./img/11.png')}></Image>
          </View>
        </ScrollView>
      )}
    })

var ConnectionCode = React.createClass({
  render() {
    return (
      <View style={styles.container3}>
      <Image
        style={{width: 140, height: 50, resizeMode: 'contain'}}
        source={require('./img/seb85.png')}></Image>
      </View>
    )}
})
var Connection = React.createClass({
  getInitialState: function() {
    this.state = {
      text: 'Insert Connection Code Here',
      something: true
    }
    return {
      text: ''
    }
  },
  seb85() {
    this.props.navigator.push({
      component: ConnectionCode,
      title: "Connection Code",
    })
  },
  render() {
    return (
        <View style={styles.container3}>
            <Image
              style={{width: 220, height: 100, resizeMode: 'contain'}}
              source={require('./img/Connections3.png')}></Image>
            <Image
              style={{width: 340, height: 150, resizeMode: 'contain'}}
              source={require('./img/connectiondescription.png')}></Image>

            <TouchableOpacity style={[styles.button3, styles.buttonTan]}
            onPress={this.seb85}>
              <Image
                style={{height: 44, resizeMode: 'contain'}}
                source={require('./img/getconnectioncode.png')}></Image>
            </TouchableOpacity>

            <Image
              style={{width: 140, height: 50, resizeMode: 'contain', opacity: 0}}
              source={require('./img/seb85.png')}></Image>

            <Image
              style={{width: 200, height: 70, resizeMode: 'contain'}}
              source={require('./img/insertcode.png')}></Image>
            <TextInput
               style={{
                 height: 50,
                 color: '#FFF2DA',
                 paddingLeft: 15,
                 fontFamily: "Avenir-Medium",
                 borderColor: '#FFF2DA',
                 borderWidth: 3,
                 marginLeft: 95,
                 marginRight: 95
                }}
               onChangeText={(text) => this.setState({text})}
               value={this.state.text}
             />
             <TouchableOpacity style={[styles.button7, styles.buttonTan]}>
               <Image
                 style={{height: 44, resizeMode: 'contain'}}
                 source={require('./img/enter.png')}></Image>
             </TouchableOpacity>
        </View>
  )}
});


var GamePage = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // var createPieces = () => {
    //   var pieces = [];
    //   _.forEach(PIECES, (value, key) => {
    //     for (var i = 0; i < value; i++) {
    //       pieces.push({
    //         piece: key,
    //         team: 'red',
    //         oldPos:{},
    //         newPos:{}
    //       });
    //     }
    //   });
    //   return pieces;
    // }

    return {
      dataSource: ds.cloneWithRows([]),
      data: [],
      pieces: [],
      isStarted: false,
      move:[],
      currentPlayer: 'red',
      team: null,
      gameFinish: false
    };
  },
  _pressData: ({}: {[key: number]: boolean}),
  componentWillMount: function() {
    this._pressData = {};
  },
  componentDidMount: function() {
    console.log('here')
    fetch("https://nameless-falls-19660.herokuapp.com/joingame", {
      method: 'GET',
      headers: {
      "Content-Type": "application/json"
    }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({team: responseJson.myTeam});
        return responseJson.myTeam
      })
      .then((team) => {
        console.log('FUCK YIU', team)
            var pieces = [];
            _.forEach(PIECES, (value, key) => {
              for (var i = 0; i < value; i++) {
                console.log('What is going on', team)
                pieces.push({
                  piece: key,
                  team: team,
                  oldPos:{},
                  newPos:{}
                });
              }
            });
            return pieces;
          }).then((pieces) => this.setState({pieces: pieces}))
        .catch((err) => {
          console.log('cannotsendboard!',err)
        })
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._genRows({})),
    })
  },
  _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 8; ii++) {
      var row = [];
      for (var ij = 0; ij < 8; ij++) {
        row.push('');
      }
      dataBlob.push(row);
      this.setState({data: dataBlob})
    }
    // for (var ii = 0; ii < 64; ii++) {
    //   var pressedText = pressData[ii] ? ' (X)' : '';
    //   dataBlob.push(ii + pressedText);
    // }
    return dataBlob;
  },
  // <Image
  //   style={{width: 40, height: 40, resizeMode: 'contain'}}
  //   source={require('./img/spiece.png')}></Image>

  imageMap: function(item) {
    console.log('sebastian', item)
    if (item.team !== this.state.team) {
      return require('./img/bowser.png')
    }
    if (item.piece === 'S') {
      return require('./img/spiece.png')
    }
    else if (item.piece === 'B') {
      return require('./img/bpiece.png')
    }
    else if (item.piece === 'F') {
      return require('./img/fpiece.png')
    }
    else if (item.piece === '2') {
      return require('./img/2piece.png')
    }
    else if (item.piece === '3') {
      return require('./img/3piece.png')
    }
    else if (item.piece === '4') {
      return require('./img/4piece.png')
    }
    else if (item.piece === '5') {
      return require('./img/5piece.png')
    }
    else if (item.piece === '6') {
      return require('./img/6piece.png')
    }
    else if (item.piece === '7') {
      return require('./img/7piece.png')
    }
    else if (item.piece === '8') {
      return require('./img/8piece.png')
    }
    else if (item.piece === '9') {
      return require('./img/9piece.png')
    }
    else if (item.piece === '10') {
      return require('./img/10piece.png')
    }

  },
  _pressRow: function(colID: number, rowID: number) {
    var row = parseInt(rowID), col = parseInt(colID);
    console.log('original ' +colID + 'col' + rowID);
    var rowMin = 9;
    var rowMax = -1;
    if (this.state.team === 'red'){
      console.log(this.state.team);
      rowMin = 5;
      rowMax = 7;
    } else if (this.state.team === 'blue'){
      console.log(this.state.team)
      rowMin = 0;
      rowMax = 2;
    }
    if (rowMin <= row && row <= rowMax) {
      console.log('setting board')
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var newState = Object.assign({}, this.state);

      if (!newState.data[col][row]) {
        var thisPiece = newState.pieces[newState.pieces.length - 1];
        console.log(thisPiece);

      if (thisPiece.newPos === {}){
          thisPiece.newPos.row = row;
          thisPiece.newPos.col = col;
      }
      else{
          thisPiece.oldPos.row = thisPiece.newPos.row;
          thisPiece.oldPos.col = thisPiece.newPos.col;
          thisPiece.newPos.row = row;
          thisPiece.newPos.col = col;

          //send this shit to the backend
        }
        newState.data[col][row] = thisPiece;
        console.log("old: "+ thisPiece.oldPos + ' and ' + "new: "+ thisPiece.newPos);
        newState.dataSource = ds.cloneWithRows(newState.data);
        newState.pieces.pop();
      } else {
        newState.pieces.push(newState.data[col][row]);
        newState.data[col][row] = '';
        newState.dataSource = ds.cloneWithRows(newState.data);
      }
      //fetch("placeholder", {
     //     method:'POST',
     //     headers:{
     //       "Content-Type": "application/json"
     //     }}).then((resp) => resp.json())
     //     .then((json)=> {
     //       if (json.success){
     //
     //       }
     //     })
      this.setState(newState);
    }
  },
  _gameMove: function(colID: number, rowID: number) {
    var clickOne = null;
    var clickTwo = null;
    if (this.state.move.length === 0) {
      if(this.state.data[colID][rowID].team!==this.state.currentPlayer || this.state.data[colID][rowID].team!==this.state.team ) {
        console.log('noturTeam ***** ', this.state.team)
        console.log('currentPlayer ****', this.state.currentPlayer)
        console.log('pieceTeam **** ', this.state.data[colID][rowID].team)
        return 'not ur team'
      }
      if(this.state.data[colID][rowID].piece==='B') {
        console.log('bomb')
        return 'flag'
      }
      if(this.state.data[colID][rowID].piece==='F') {
        console.log('flag')
        return 'flag'
      }
  console.log('passed all ifs...')
     clickOne= {row: rowID, col: parseInt(colID)}
     var newMove = [clickOne];
     this.setState({move: newMove})
  } else if (this.state.move.length > 0) {
     clickTwo={row: rowID, col: parseInt(colID)}
     var newMove = [this.state.move[0], clickTwo]
     this.setState({move: newMove});
  }

    // var row = parseInt(rowID), col = parseInt(colID);
    //
    // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // var newState = Object.assign({}, this.state);
    //
    // if (!newState.data[col][row] && !!newState.pieces.length) {
    //   var thisPiece = newState.pieces[newState.pieces.length - 1];
    //   newState.data[col][row] = thisPiece;
    //   newState.dataSource = ds.cloneWithRows(newState.data);
    //   newState.pieces.pop();
    // } else {
    //   if (!newState.pieces.length) {
    //     newState.pieces.push(newState.data[col][row]);
    //     newState.data[col][row] = '';
    //     newState.dataSource = ds.cloneWithRows(newState.data);
    //   } else {
    //     Alert.alert('Cannot make move')
    //   }
    // }
    //
    // this.setState(newState);
  },
  clear() {
    this.setState({move: []})
  },
  sendMove() {
if(this.state.move.length===2) {
      fetch("https://nameless-falls-19660.herokuapp.com/makemove", {
      method: 'POST',
      body: JSON.stringify({
        move:this.state.move,
        board:this.state.data
      }),
      headers: {
      "Content-Type": "application/json"
      }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('recievedMoveResponse',responseJson)
        this.setState({
          data:responseJson.board,
          dataSource:this.state.dataSource.cloneWithRows(responseJson.board),
          move:responseJson.move,
          currentPlayer:responseJson.currentPlayer,
          gameFinish:responseJson.gameWon
        })
        return this.state.gameFinish
        })
        .then((finish) => {
          if (finish) {
          alert(this.state.team + " has won!")
          }
        })
        .catch((err) => {
          console.log('cannotsendmove!',err)
        })
} else {
  alert('error plz make your move :)')
}
  },
  _started: function(){
    this.setState({isStarted: true});
    fetch("https://nameless-falls-19660.herokuapp.com/setupboard", {
      method: 'POST',
      body: JSON.stringify({board:this.state.data, team: this.state.team}),
      headers: {
      "Content-Type": "application/json"
      }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('recieved initial response',responseJson)
        console.log('DATA', this.state.data)
        this.setState({data: responseJson.board})
        this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.board)})
        console.log('DATA2 (*****) ', this.state.data)
      }).then(() => {
        var stateUpdate = setInterval(() => {
          fetch("https://nameless-falls-19660.herokuapp.com/stateupdate", {
          method: 'POST',
          body: JSON.stringify({reqBoard: this.state.data}),
          headers: {
          "Content-Type": "application/json"
          }
          })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log('recieved Update',responseJson)
            this.setState({data: responseJson.board, currentPlayer: responseJson.currPlayer})
            this.setState({dataSource:this.state.dataSource.cloneWithRows(responseJson.board)})
            })
            .catch((err) => {
              console.log('cannotGetUpdate!',err)
            })
        }, 1000)
      })
      .catch((err) => {
          console.log('cannotsendboard!',err)
        })
  },
  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    console.log(rowData, sectionID, rowID);

    return (
        <View>
          {typeof rowData === 'object' &&
            rowData.map((rowNumber, i) => (
              // <TouchableHighlight onPress={() => this._pressRow(rowID, i)}
              <TouchableHighlight onPress={this.state.isStarted ? () => this._gameMove(rowID, i) : () => this._pressRow(rowID,i)} underlayColor='green'>
                <View>
                  <View style={styles.row}>
                  {!!rowNumber && !!rowNumber.piece &&
                    <Image
                    style={{width: 40, height: 40, resizeMode: 'contain'}}
                    source={this.imageMap(rowNumber)}></Image>
                  }

                  </View>
                </View>
              </TouchableHighlight>
            ))
          }
        </View>
    )
  },
  render() {
    return (
      <View style={styles.container1}>
        <ListView contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
        {!!this.state.pieces.length && <Text style={styles.bigtext}>{this.state.pieces[this.state.pieces.length-1].piece}</Text>}
        {!this.state.pieces.length && !this.state.isStarted &&
          <TouchableOpacity style={[styles.button6, styles.buttonPink]} onPress={this._started}>
            <Image
            style={{height: 36, resizeMode: 'contain'}}
            source={require('./img/finish.png')}></Image>
          </TouchableOpacity>
        }
        {this.state.isStarted &&
          <TouchableOpacity style={[styles.button4, styles.buttonGreen]} onPress={this.sendMove}>
          <Image
          style={{height: 34, resizeMode: 'contain'}}
          source={require('./img/move.png')}></Image>
          </TouchableOpacity>
        }
        {this.state.isStarted &&
          <TouchableOpacity style={[styles.button5, styles.buttonBlue]} onPress={this.clear}>
            <Image
            style={{height: 34, resizeMode: 'contain'}}
            source={require('./img/clear.png')}></Image>
          </TouchableOpacity>
        }

      </View>
    )
  }
})

var Stratizons = React.createClass({
  press() {
    this.props.navigator.push({
      component: GamePage,
      title: "Play Game!",
    })
  },
  rules() {
    this.props.navigator.push({
      component: Rules,
      title: "Instructions"
    });
  },
  connection() {
    this.props.navigator.push({
      component: Connection,
      title: "Connections"
    })
  },

  render() {
    return (
      <View style={styles.container2}>
        <Image
          style={{width: 400, height: 400, resizeMode: 'contain'}}
          source={require('./img/Stratizons1.png')}></Image>
      <TouchableOpacity onPress={this.press} style={[styles.button2, styles.buttonGreen]}>
        <Image
          style={{height: 40, resizeMode: 'contain'}}
          source={require('./img/play.png')}></Image>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button2, styles.buttonPink]} onPress={this.connection}>
        <Image
          style={{height: 40, resizeMode: 'contain'}}
          source={require('./img/connections.png')}></Image>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button2, styles.buttonBlue]} onPress={this.rules}>
        <Image
          style={{height: 40, resizeMode: 'contain'}}
          source={require('./img/rules2.png')}></Image>
      </TouchableOpacity>
      </View>
    );
  }
});



const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: 10
  },
  row: {
    justifyContent: 'center',
    width: 44,
    height: 55,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold',
    alignItems: 'flex-end'
  },
  item: {
    backgroundColor: '#CCC',
    margin: 1,
    width: 10,
    height: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF2DA',
    paddingBottom: 20
  },
  container3: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
    backgroundColor: '#333C56'
  },
  container4: {
    flex: 1,
    marginBottom: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF2DA'
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF2DA',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BAAD97',
  },
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  button1: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 80,
    borderRadius: 5
  },
  button2: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 1,
    paddingBottom: 1,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    borderRadius: 5
  },
  button3: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    borderRadius: 5
  },
  button4: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 18,
    marginLeft: 13,
    marginRight: 190,
    marginBottom: 7,
    borderRadius: 5
  },
  button5: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 7,
    marginLeft: 13,
    marginRight: 190,
    marginBottom: 18,
    borderRadius: 5
  },
  button6: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 40,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 65,
    borderRadius: 5
  },
  button7: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 95,
    marginRight: 95,
    marginBottom: 80,
    borderRadius: 5
  },
  image: {
    marginLeft: 5,
    marginRight: 5,
  },
  bigtext: {
    fontSize: 100,
    fontFamily: "Avenir-Medium"
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#464646',
  },
  buttonPink: {
    backgroundColor: '#333C56'
  },
  buttonGreen: {
    backgroundColor: '#013240'
  },
  buttonTan: {
    backgroundColor: '#FFF2DA'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Avenir-Medium',
    color: 'white'
  }
});
// const styles = StyleSheet.create({
//   list: {
//     justifyContent: 'center',
//     flexDirection: 'row',
//     flexWrap: 'wrap'
//   },
//   item: {
//     backgroundColor: '#CCC',
//     margin: 1,
//     width: 10,
//     height: 10
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   containerFull: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'stretch',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   textBig: {
//     fontSize: 36,
//     textAlign: 'center',
//     margin: 10,
//   },
//   button: {
//     alignSelf: 'stretch',
//     paddingTop: 10,
//     paddingBottom: 10,
//     marginTop: 10,
//     marginLeft: 5,
//     marginRight: 5,
//     borderRadius: 5
//   },
//   buttonRed: {
//     backgroundColor: '#FF585B',
//   },
//   buttonBlue: {
//     backgroundColor: '#0074D9',
//   },
//   buttonPink: {
//     backgroundColor: '#FF585B'
//   },
//   buttonGreen: {
//     backgroundColor: '#2ECC40'
//   },
//   buttonLabel: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: 'white'
//   }
// });

AppRegistry.registerComponent('myFirstRN', () => myFirstRN );
