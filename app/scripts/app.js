var React = window.React = require('react'),
    ReactDOM = require("react-dom"),
    Board = require('./components/board'),
    Splash = require('./components/splash'),
    Player = require('../unit/player'),
    Table = require('../unit/table'),
    Shoe = require('../unit/shoe')


var Container = React.createClass({
  getInitialState: function(){

    return {
      board: null,
      splash: <Splash hide={this.hide} />,
      playerCount: 0
    }
  },

  postHit: function(boardState) {
    this.setState({
      table: boardState
    }, function(){
      this.setState({
        board: <Board players={this.state.playerCount} updatePostHit={this.postHit} table={this.state.table} />
      })
    })
  },

  createBoard: function(count) {
    var singleDeck =
    [
    '2h', '2s', '2d', '2c',
    '3h', '3s', '3d', '3c',
    '4h', '4s', '4d', '4c',
    '5h', '5s', '5d', '5c',
    '6h', '6s', '6d', '6c',
    '7h', '7s', '7d', '7c',
    '8h', '8s', '8d', '8c',
    '9h', '9s', '9d', '9c',
    '10h', '10s', '10d', '10c',
    'Jh', 'Js', 'Jd', 'Jc',
    'Qh', 'Qs', 'Qd', 'Qc',
    'Kh', 'Ks', 'Kd', 'Kc',
    'Ah', 'As', 'Ad', 'Ac',
  ]
    var players = []
    for (var i = 0; i < count; i++) {
      var player = new Player()
      players.push(player)
    }
    var shoe = new Shoe(singleDeck)
    var table = new Table(shoe, players)
    table.deal()
    var self = this
    this.setState({
      table: table,
      splash: null
    }, function(){
      this.setState({

      board: <Board players={self.state.playerCount} updatePostHit={self.postHit} table={this.state.table} />
    })
    })
  },
  hide: function(numeroPlayers) {
    var totalPlayers = Number(numeroPlayers) + 2
    this.setState({
      playerCount: totalPlayers,
    }, function(){

      this.createBoard(totalPlayers)
    })


  },

  render: function() {
    return (
    <div>
      {this.state.splash}
      {this.state.board}
    </div>
    )
  }

})






ReactDOM.render(<Container />, document.getElementById('app'));
