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
  ImagePickerIOS
} from 'react-native'
var _ = require('underscore');
var PIECES = {
  'F':  1,
  'B':  2,
  'S':  1,
  '2':  4,
  '3':  2,
  '4':  2,
  '5':  3,
  '6':  2,
  '7':  2,
  '8':  2,
  '9':  2,
  '10': 1
}
// This is the root view
var finalGame = React.createClass({
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
var Rules = React.createClass({
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.textBig}>Register Below</Text>
      <TextInput
      style={{
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      placeholder="Set your username"
      onChangeText={(text) => this.setState({username: text})}
      />
      <TextInput
      style={{
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      placeholder="Set your password"
      onChangeText={(text) => this.setState({password: text})}
      />
      <TouchableOpacity onPress={this.press} style={[styles.button, styles.buttonBlue]}>
      <Text style={styles.buttonLabel}>Tap to Register</Text>
      </TouchableOpacity>
      </View>
    );
  }
});
var GamePage = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var createPieces = () => {
      var pieces = [];
      _.forEach(PIECES, (value, key) => {
        for (var i = 0; i < value; i++) {
          pieces.push({
            piece: key,
            team: 'red',
            oldPos:{},
            newPos:{},
          });
        }
      });
      return pieces;
    }
    return {
      dataSource: ds.cloneWithRows([]),
      data: [],
      pieces: createPieces(),
      isStarted: false,
      move:[],
      currentPlayer: 'red'
    };
  },
  _pressData: ({}: {[key: number]: boolean}),
  componentWillMount: function() {
    this._pressData = {};
  },
  componentDidMount: function() {
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
      }.0
      dataBlob.push(row);
      this.setState({data: dataBlob})
    }
    // for (var ii = 0; ii < 64; ii++) {
    //   var pressedText = pressData[ii] ? ' (X)' : '';
    //   dataBlob.push(ii + pressedText);
    // }
    return dataBlob;
  },
  _pressRow: function(colID: number, rowID: number) {
    var row = parseInt(rowID), col = parseInt(colID);
    console.log('original ' +colID + 'col' + rowID);
    if (5 <= row && row <= 7) {
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
      if(this.state.data[colID][rowID].piece==='B') {
        console.log('bomb')
        return 'flag'
      }
      if(this.state.data[colID][rowID].piece==='F') {
        console.log('flag')
        return 'flag'
      }
      if(this.state.data[colID][rowID].team!==this.state.currentPlayer) {
        console.log('noturTeam')
        return 'not ur team'
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
    // var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // var newState = Object.assign({}, this.state);
    // console.log(this.newState);
    // if (!newState.data[col][row] && !!newState.pieces.length) {
      // var thisPiece = this.state.
      // console.log(thisPiece);
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
    // this.setState(newState);
    // console.log(this.pieces)
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
          currentPlayer:responseJson.currentPlayer
        })
        })
        .catch((err) => {
          console.log('cannotsendmove!',err)
        })
} else {
  alert('error plz make your move:)')
}
  },
  _started: function(){
    this.setState({isStarted: true});
    fetch("https://nameless-falls-19660.herokuapp.com/setupboard", {
      method: 'POST',
      body: JSON.stringify({board:this.state.data}),
      headers: {
      "Content-Type": "application/json"
      }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('recieved',responseJson)
        })
        .catch((err) => {
          console.log('cannotsendboard!',err)
        })
  },
  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    return (
        <View>
          {typeof rowData === 'object' &&
            rowData.map((rowNumber, i) => (
              // <TouchableHighlight onPress={() => this._pressRow(rowID, i)}
              <TouchableHighlight onPress={this.state.isStarted ? () => this._gameMove(rowID, i) : () => this._pressRow(rowID,i)}  underlayColor='green'>
                <View>
                  <View style={styles.row}>
                  {!!rowNumber && !!rowNumber.piece &&
                    <Text style={styles.text1}>
                      {(rowNumber.piece)}
                    </Text>
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
console.log('UPDATED BOARD',this.state.data)
console.log('MOVE ARRAY',this.state.move)
    return (
      <View style={styles.container}>
        <ListView contentContainerStyle={styles.list}
          dataSource = {this.state.dataSource}
          renderRow={this._renderRow}
        />
        {!!this.state.pieces.length && <Text style={{fontSize: 100}}>{this.state.pieces[this.state.pieces.length-1].piece}</Text>}
        {!this.state.pieces.length &&
          <TouchableOpacity style={[styles.button, styles.buttonPink]} onPress={this._started}>
          <Text style={styles.buttonLabel}>Finished with Turn</Text>
          </TouchableOpacity>
        }
        <TouchableOpacity style={[styles.button, styles.buttonPink]} onPress={this.sendMove}>
        <Text style={styles.buttonLabel}>make Move</Text>
        </TouchableOpacity>
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
      title: "Rules & Settings "
    });
  },
  connection() {
    this.props.navigator.push({
      component: Rules,
      title: "Connection Codes"
    })
  },
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 400, height: 400, resizeMode: 'contain'}}
          source={{uri:"https://www.stratego.com/wp-content/uploads/2014/10/stratego-multiplayer-screenshot1-300x225.jpg"}}></Image>
      <TouchableOpacity onPress={this.press} style={[styles.button, styles.buttonGreen]}>
      <Text style={styles.buttonLabel}>Tap to Play
      </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonPink]} onPress={this.connection}>
      <Text style={styles.buttonLabel}>Connection Codes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={this.rules}>
      <Text style={styles.buttonLabel}>Rules & Settings</Text>
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
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold',
    alignItems: 'right'
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
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#24248f',
  },
  buttonPink: {
    backgroundColor: '#99004d'
  },
  buttonGreen: {
    backgroundColor: '#008000'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  }
});
// const styles = StyleSheet.create({
//   list: {
//     justifyContent: 'center',
//     flexDirection: 'row',
//
Add Comment Collapse
