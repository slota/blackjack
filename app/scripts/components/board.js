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
    var postHit = this.props.table
    postHit.hit(this.props.table.players[1])
    this.props.updatePostHit(postHit)
  },
  render: function() {
    var pictures = this.pictureLoop();
    var self = this
    console.log(this.props.table);
    var createPlayers = pictures.map(function(picture,index) {
      return <IndividualPlayer pictureName={picture} ind={index} key={index} table={self.props.table} player={self.props.table.players[index]} />
    })

    return (
      <div id="table">
        <div id ="players">
          {createPlayers}
        </div>
        <div className="hitAndStay">
        <button onClick={this.hit} id='hit' className="deal btn btn-primary"> HIT!! </button>
        <button id='stay' className="deal btn btn-danger"> STAY!!</button>
        </div>
      </div>
    )
  }
})

module.exports = Board
