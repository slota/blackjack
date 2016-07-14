

var IndividualPlayer = React.createClass({
  render: function() {
    var self = this
    var playerCards = this.props.player.hand.map(function(val, ind){
      return <img style={{height: '125px'}} src={"../../images/playing_cards/"+ val +".png"} className="card" key={ind} />
    })
    return (
      <div>
        <img style={{height: '200px'}} className="pic" id={'player'+this.props.ind}  src={"../../images/characters/"+ this.props.pictureName +".jpg"} />
        {playerCards}
      </div>
  )

  }
})

module.exports = IndividualPlayer
