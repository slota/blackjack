var Splash = React.createClass({
  hidden: function() {
    this.props.hide(this.refs.selectBox.value)
  },
  render: function() {
    return (
      <div id="homepage">
        <h1>Welcome to the BlackJack</h1>
        <label htmlFor="select">Choose number of Computer players</label>
        <select name="select" id="selectPlayers" ref="selectBox">
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

module.exports= Splash
