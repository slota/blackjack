
function Table(shoe, players){
  this.shoe = shoe
  this.players = players
}

Table.prototype.hit = function(player) {
  var cardDealt = this.shoe.cards.shift()
  player.hand.push(cardDealt)
}

Table.prototype.deal = function() {
  var self = this
  this.players.forEach(function(player){
    self.hit(player)
    self.hit(player)
})
}

Table.prototype.runningCount = function() {
  return this.players.reduce(function(prev, current){
    return prev += current.hand.reduce(function(prev1, card){

      var card = card.slice(0, -1)
      
      if(Number(card) < 7) return prev1 += 1
      else if(Number(card) <= 9) return prev1 += 0
      else return prev1 -= 1
    }, 0)
  }, 0)
}

Table.prototype.trueCount = function(){

  return(this.runningCount() / (Math.ceil(this.shoe.cards.length / 52)))
}

module.exports = Table
