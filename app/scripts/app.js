var React = window.React = require('react'),
    ReactDOM = require("react-dom");

var TodoApp = React.createClass({
  hide: function() {
    $('#homepage').hide()
  },
  render: function() {
    return (
      <div id="homepage">
        <h1>Welcome to the BlackJack</h1>
        <select id="selectPlayers">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button onClick={this.hide} id="startGame" className="btn btn-success">Start Game</button>
      </div>

    );
  }
});

ReactDOM.render(<TodoApp />, document.getElementById('app'));
