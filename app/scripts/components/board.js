
var $ = require('jQuery');
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

    if(this.props.table.shoe.cards.length < 10){
      this.props.createBoard(this.props.players)
    }

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
    var newTable = this.props.table
    newTable.players[1].stayIn = true;
    this.setState({
      table: newTable
    })
    while(this.props.table.players[0].score() < 17) {
      var postHit = this.props.table
      postHit.hit(this.props.table.players[0])
      this.props.updatePostHit(postHit)
    }
    if(this.props.table.players[0].score() == 17){
      if(this.props.table.players[0].hand.indexOf('As', 'Ah', 'Ac', 'Ad') !== -1){
        var postHit = this.props.table
        postHit.hit(this.props.table.players[0])
        this.props.updatePostHit(postHit)
      }
    }

  },

  hide: function(){
    $("#counts").toggle();
    var newTable = this.props.table
    console.log("hola");
    this.setState({
      table: newTable
    })
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
    var winner;
    var winClass;
    if(this.props.table.findWinner() == 'dealer') {
      winner = 'You lose'
      winClass = 'alert alert-danger winMessage'
    }
    else if(this.props.table.findWinner() == 'push') {
      winner = 'Push'
      winClass = 'alert alert-default winMessage'
    }
    else {
      winner = 'You win'
      winClass = 'alert alert-success winMessage'
    }
    var blackjack = this.props.table.determineBlackJack()
    if (blackjack == 'player blackjack') {
      stayIn = true
      winner = "You win with blackjack!!"
      winClass = 'alert alert-success winMessage'
    }
    if (blackjack == 'dealer blackjack'){
      stayIn = true
      winner = "You lose, dealer has blackjack"
      winClass = 'alert alert-danger winMessage'
    }
    var displayHitAndStay
    if (bust && !stayIn){
      displayHitAndStay = true
    } else {
      displayHitAndStay = false
    }

    return (
      <div id="table">
        <div id ="players">
        <div>
          <div className="jumbotron">
        <button className="btn btn-primary" onClick={this.hide} id="toggleCounts">Toggle Counts</button>
          <div id="counts">
            <h4 id="runningCount"> Running Count: {runCount} </h4>
            <h4 id="trueCount"> True Count: {trueCount} </h4>
          </div>
          {(bust
              ? null
              : <div>
                  <div className={winClass} id='bustMessage'>You busted, house wins</div>
                </div>
          )}
          {(stayIn
              ? <div>
                  <div className={winClass} id='winMessage'>{winner}</div>
                </div>
              : null
          )}
        </div>
          {createPlayers}
        </div>
        {(displayHitAndStay
          ? <div className="hitAndStay">
              <button onClick={this.hit} id='hit' className="btn btn startButton hit"> HIT!! </button>
              <button id='stay' onClick={this.stay} className="btn btn startButton"> STAY!!</button>
            </div>
          : <button className="btn btn-default hitAndStay " onClick={this.newHand} id="thaNewDeal">Deal a new hand</button>
        )}
      </div>
    </div>
    )
  }
})

module.exports = Board
