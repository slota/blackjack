var toastr = require('toastr')
var Splash = React.createClass({
  hidden: function() {
    toastr['info']( 'Play on my child', 'If you plant them they will grow')
    this.props.hide(this.refs.selectBox.value)
  },
  render: function() {
    return (
      <div id="homepage">
          <div className="mainContent">
          <h1 className="titleStuff">Welcome to Casino Counter</h1>
          <p className="descriptionStuff">the original blackjack card counting app</p>
        <label htmlFor="select">Choose number of Computer players</label>

        <select name="select" id="selectPlayers" ref="selectBox">
          <option value="0">0</option>
        </select>
        <br/>
        <button onClick={this.hidden} id="startGame" className="btn btn startButton">Start Game</button>
        </div>
          <img className="chipStuff" src="../../styles/assets/transChip.png" />

      </div>

    );
  }
});

module.exports= Splash
