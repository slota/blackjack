function Player(){
  this.hand = []
  this.stillIn = true;
  this.stayIn = false;
}


Player.prototype.score = function() {
  if(!this.hand[0]) return 0;
  this.cardSort()
  var playerScore = this.hand.reduce(function(prev, current){
    var card = current;
    card = card.slice(0, -1)
    if(card == 'A') {
      return prev+= prev + 11 <= 21 ? 11 : 1
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

Player.prototype.cardSort = function(){
  for (var i = 0; i < this.hand.length; i++) {
    var card = this.hand[i].slice(0, -1)
    if(card == 'A'){
      if(this.hand[this.hand.length - 1].slice(0,1) == 'A' && i !== this.hand.length -1){
          oldValue = this.hand[this.hand.length - 2]
          ace = this.hand[i]
          this.hand[this.hand.length - 2] = ace
          this.hand[i] = oldValue
      }
      else {
        oldValue = this.hand[this.hand.length -1]
        ace = this.hand[i]
        this.hand[this.hand.length -1] = ace
        this.hand[i] = oldValue
      }
    }
  }
}



Player.prototype.statusType = function(){
    if(this.score() <= 21){
      this.stillIn = true
    }
    else{
      this.stillIn = false
    }
    return this.stillIn
  }


module.exports = Player
