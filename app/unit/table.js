function Table(shoe, player){
  this.shoe = shoe
  this.player = player
}

Table.prototype.hit = function(player) {
  this.player.hand.push(this.shoe.cards.shift())
}

Table.prototype.deal = function() {
  this.hit(player)
  this.hit(player)
}

module.exports = Table
