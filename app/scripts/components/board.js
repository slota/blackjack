var IndividualPlayer = require('./individual_player')
var Board = React.createClass({
  pictureLoop: function(){
    var array = []
    var playerArray = ['dealer', 'player','croc', 'hippo', 'rabbit', 'snake']
    for (var i=0; i < this.props.players; i++){
      array.push(playerArray[i])
    }
    return array
  },
  hit: function(){
    if(!this.props.table.players[1].stillIn || this.props.table.players[1].stayIn) return;
    var postHit = this.props.table
    postHit.hit(this.props.table.players[1])
    this.props.updatePostHit(postHit)
  },

  stay: function(){
    var derp = this.props.table
    derp.players[1].stayIn = true;
    this.setState({
      table: derp
    })
  },

  render: function() {
    var pictures = this.pictureLoop();
    var self = this
    var createPlayers = pictures.map(function(picture,index) {
      return <IndividualPlayer pictureName={picture} ind={index} key={index} table={self.props.table} player={self.props.table.players[index]} />
    })
    var bust = this.props.table.players[1].stillIn
    var stayIn = this.props.table.players[1].stayIn
    console.log(bust);

    return (
      <div id="table">
        <div id ="players">
        <div>
          {(bust
              ? <div>You're good</div>
              : <div className="alert alert-danger" id='bustMessage'>aaaaaand boom goes the dynamite</div>
          )}
          {(stayIn
              ? <button className="btn btn-default" id="thaNewDeal">deal a new deal</button>
              : null
          )}
        </div>
          {createPlayers}
        </div>
        <div className="hitAndStay">
        <button onClick={this.hit} id='hit' className="deal btn btn-primary"> HIT!! </button>
        <button id='stay' onClick={this.stay} className="deal btn btn-danger"> STAY!!</button>
        </div>
      </div>
    )
  }
})

module.exports = Board
