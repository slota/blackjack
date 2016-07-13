function Player(){
  this.hand = []
  this.stillIn = true;
}

Player.prototype.score = function() {
  if(!this.hand[0]) return 0;
  var playerScore = this.hand.reduce(function(prev, current){
    var card = current;
    card = card.slice(0, -1)
    if(card == 'A') {
      return prev += 11
    }
    else if(isNaN(Number(card))) {
      return prev +=10
    }
    else {
       return prev+= Number(card)
    }

  }, 0)
  if(playerScore > 21){
    return 'boom goes the dynamite'
  }
  else{
    return playerScore;
  }
}

Player.prototype.statusType = function(){
    if(this.score() < 21){
      this.stillIn = true
    }
    else{
      this.stillIn = false
    }
    return this.stillIn
  }


module.exports = Player
