

var IndividualPlayer = React.createClass({
  render: function() {
    var self = this
    var bust = this.props.table.players[1].statusType()
    var stayIn = this.props.table.players[1].stayIn
    var playerCards = this.props.player.hand.map(function(val, ind){
        if(self.props.ind == 0 && ind == 1 && bust && !stayIn && !self.props.table.determineBlackJack()){
          return <img style={{height: '125px'}} src={"../../images/playing_cards/backofcard.jpg"} className="card" key={ind} />
        }
      return <img style={{height: '125px'}} src={"../../images/playing_cards/"+ val +".png"} className="card" key={ind} />
    })
    return (
      <div className="wholePlayer">
        <img style={{height: '200px'}} className="pic" id={'player'+this.props.ind}  src={"../../images/characters/"+ this.props.pictureName +".jpg"} />
        {playerCards}
      </div>
  )

  }
})

module.exports = IndividualPlayer
