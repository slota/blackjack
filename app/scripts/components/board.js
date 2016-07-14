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
    console.log("before");
    if(!this.props.table.players[1].stillIn || this.props.table.players[1].stayIn) return;
    var postHit = this.props.table
    postHit.hit(this.props.table.players[1])
    if(!postHit.players[1].statusType()){
      while(this.props.table.players[0].score() < 17) {
        var dealerHit = this.props.table
        dealerHit.hit(this.props.table.players[0])
        this.props.updatePostHit(dealerHit)
      }
    }
    this.props.updatePostHit(postHit)
  },
  newHand: function(){
    var newTable = this.props.table
    newTable.players.forEach(function(player){
      player.hand = []
      player.stillIn = true;
      player.stayIn = false
    })
    newTable.deal()
    this.setState({
      table: newTable
    })
  },

  stay: function(){
    var derp = this.props.table
    derp.players[1].stayIn = true;
    this.setState({
      table: derp
    })
    while(this.props.table.players[0].score() < 17) {
      var postHit = this.props.table
      postHit.hit(this.props.table.players[0])
      this.props.updatePostHit(postHit)
    }

  },

  render: function() {
    var pictures = this.pictureLoop();
    var self = this
    var createPlayers = pictures.map(function(picture,index) {
      return <IndividualPlayer pictureName={picture} ind={index} key={index} table={self.props.table} player={self.props.table.players[index]} />
    })
    var bust = this.props.table.players[1].statusType()
    var stayIn = this.props.table.players[1].stayIn
    var runCount = this.props.table.runCount
    var trueCount = this.props.table.truthCount
    console.log(bust);

    return (
      <div id="table">
        <div id ="players">
        <div>
          <h4 id="runningCount"> Running Count: {runCount} </h4>
          <h4 id="trueCount"> True Count: {trueCount} </h4>
          {(bust
              ? null
              : <div>
                  <div className="alert alert-danger" id='bustMessage'>aaaaaand boom goes the dynamite</div>
                  <button className="btn btn-default" onClick={this.newHand} id="thaNewDeal">deal a new deal</button>
                </div>
          )}
          {(stayIn
              ? <button className="btn btn-default" onClick={this.newHand} id="thaNewDeal">deal a new deal</button>
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
