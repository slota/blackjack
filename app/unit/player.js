function Player(deck){
  this.deck = deck
  this.cards = []
}

Player.prototype.deal = function(){
  this.cards = ['1d',2]
}
module.exports = Player
