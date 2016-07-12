var React = window.React = require('react'),
    ReactDOM = require("react-dom"),
    Table = require('./components/table')


var Container = React.createClass({
  getInitialState: function(){
    return {
      table: null,
      splash: <Splash hide={this.hide} />,
      playerCount: 0
    }
  },
  hide: function(val) {
    console.log(val);
    this.setState({
      playerCount: val,
      table: <Table players={val} />,
      splash: null
    })

  },

  render: function() {
    return (
    <div>
      {this.state.splash}
      {this.state.table}
    </div>
    )
  }

})

var Splash = React.createClass({
  hidden: function() {
    this.props.hide(this.refs.selectBox.value)
  },
  render: function() {
    return (
      <div id="homepage">
        <h1>Welcome to the BlackJack</h1>
        <select id="selectPlayers" ref="selectBox">
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <button onClick={this.hidden} id="startGame" className="btn btn-success">Start Game</button>
      </div>

    );
  }
});




ReactDOM.render(<Container />, document.getElementById('app'));
