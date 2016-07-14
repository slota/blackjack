
function Table(shoe, players){
  this.shoe = shoe
  this.players = players
  this.runCount = 0;
  this.truthCount = 0;
  this.usedCards = []
}

Table.prototype.hit = function(player) {
  var cardDealt = this.shoe.cards.shift()
  player.hand.push(cardDealt)
  this.usedCards.push(cardDealt)
  this.runningCount()
  this.trueCount()
}

Table.prototype.deal = function() {
  var self = this
  this.players.forEach(function(player){
    self.hit(player)
    self.hit(player)
})
}

Table.prototype.runningCount = function() {
  var counter= this.usedCards.reduce(function(prev, current){

      var card = current.slice(0, -1)

      if(Number(card) < 7) return prev += 1
      else if(Number(card) <= 9) return prev += 0
      else return prev -= 1
    }, 0)
  this.runCount = counter
}

Table.prototype.trueCount = function(){
  this.runningCount()
  this.truthCount = (this.runCount / (Math.ceil(this.shoe.cards.length / 52)))
}

module.exports = Table
