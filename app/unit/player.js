function Player(){
  this.hand = []
}

Player.prototype.score = function() {
  if(!this.hand[0]) return 0;
  var card = this.hand[0]
  card = card.slice(0, -1)
  if(card == 'A') {
    return 11
  }
  else if(isNaN(Number(card))) {
    return 10
  }
  else {
    return Number(card)
  }
}

module.exports = Player
