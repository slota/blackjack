var expect = require('chai').expect;
var Table = require('../../app/unit/table')
var Shoe = require('../../app/unit/shoe')
var Player = require('../../app/unit/player')

describe('#table', function(){
  describe('hit', function(){

    it('accepts a deck and a player', function(){
      shoe = new Shoe(['As'])
      player = new Player()

      table = new Table(shoe, [player])

      expect(table.shoe.cards).to.deep.equal(['As'])
    })

    it('deals a card', function(){
      shoe = new Shoe(['As'])
      player = new Player()

      table = new Table(shoe, [player])

      table.hit(player)

      expect(table.players[0].hand).to.deep.equal(['As'])
    })

    it('should remove a card that has been dealt', function(){
      shoe = new Shoe(['As'])
      player = new Player()

      table = new Table(shoe, [player])

      table.hit(player)

      expect(table.shoe.cards.length).to.equal(0)
    })

    it('should hit mulitple cards', function(){
      shoe = new Shoe(['Jc', 'Jc'])
      player = new Player()

      table = new Table(shoe, [player])

      table.hit(player)
      table.hit(player)

      expect(table.players[0].hand).to.deep.equal(['Jc', 'Jc'])
    })

  })

  describe('deal', function(){
    it('deals two cards to a player', function(){
      shoe = new Shoe(['As', 'As'])
      player = new Player()

      table = new Table(shoe, [player])

      table.deal()

      expect(table.players[0].hand).to.deep.equal(['As', 'As'])
    })

    it('determines player has black jack', function() {
      var shoe = new Shoe(['As', 'Ks', 'Qs', 'Js', '10s', 'Ac','As', 'Ks', 'Qs', 'Js', '10s', 'Ac'])
      var player = new Player()
      var player2 = new Player()
      player.hand = ['2s', '3s']
      player2.hand = ['As', '10s']

      var players = []

      players.push(player)
      players.push(player2)

      var table = new Table(shoe, players)

      expect(table.determineBlackJack()).to.equal("player blackjack")
    })

    it('determines player has black jack even with dealer blackjack', function() {
      var shoe = new Shoe(['As', 'Ks', 'Qs', 'Js', '10s', 'Ac','As', 'Ks', 'Qs', 'Js', '10s', 'Ac'])
      var player = new Player()
      var player2 = new Player()
      player.hand = ['As', '10s']
      player2.hand = ['As', '10s']

      var players = []

      players.push(player)
      players.push(player2)

      var table = new Table(shoe, players)

      expect(table.determineBlackJack()).to.equal("player blackjack")
    })

    it('determines dealer has black jack', function() {
      var shoe = new Shoe(['As', 'Ks', 'Qs', 'Js', '10s', 'Ac','As', 'Ks', 'Qs', 'Js', '10s', 'Ac'])
      var player = new Player()
      var player2 = new Player()
      player.hand = ['As', '10s']
      player2.hand = ['2s', '3s']

      var players = []

      players.push(player)
      players.push(player2)

      var table = new Table(shoe, players)

      expect(table.determineBlackJack()).to.equal("dealer blackjack")
    })

    it('removes two cards from the deck', function(){
      shoe = new Shoe(['As', 'Ks'])
      player = new Player()

      table = new Table(shoe, [player])

      table.deal()

      expect(table.shoe.cards.length).to.equal(0)
    })
  })

  describe('counting', function(){
    it('keeps track of the running count', function(){
      shoe = new Shoe(['3s', '2s', 'As'])
      player = new Player()

      table = new Table(shoe, [player])

      table.deal()
      table.hit(player)
      table.runningCount()
      expect(table.runCount).to.equal(1)
    })

    it('keeps track of the true count', function(){
      shoe = new Shoe(['As', 'Ks', 'Qs', 'Js', '10s', 'Ac'])
      player = new Player()

      table = new Table(shoe, [player])

      table.deal()
      table.hit(player)
      table.trueCount()
      expect(table.truthCount).to.equal(-3)
    })

    it('has two players at the table', function(){
      var shoe = new Shoe(['As', 'Ks', 'Qs', 'Js', '10s', 'Ac'])
      var player = new Player()
      var player2 = new Player()
      var players = []
      players.push(player)
      players.push(player2)

      table = new Table(shoe, players)

      expect(table.players.length).to.equal(2)
      // expect(table.player2.hand.length).to.equal(2)
    })

    it('deals two cards to each player', function(){
      var shoe = new Shoe(['As', 'Ks', 'Qs', 'Js', '10s', 'Ac'])
      var player = new Player()
      var player2 = new Player()
      var players = []
      players.push(player)
      players.push(player2)

      table = new Table(shoe, players)

      table.deal()

      expect(table.players[0].hand.length).to.equal(2)
      expect(table.players[1].hand.length).to.equal(2)
    })

    it('keeps track of the running count across multiple players', function(){
      var shoe = new Shoe(['As', 'Ks', 'Qs', 'Js', '10s', 'Ac'])
      var player = new Player()
      var player2 = new Player()
      var players = []

      players.push(player)
      players.push(player2)

      var table = new Table(shoe, players)

      table.deal()
      table.runningCount()
      expect(table.runCount).to.equal(-4)
    })

    it('player takes a hit and running count is correct', function(){
      var shoe = new Shoe(['As', 'Ks', 'Qs', 'Js', '10s', 'Ac','As', 'Ks', 'Qs', 'Js', '10s', 'Ac'])
      var player = new Player()
      var player2 = new Player()
      var players = []

      players.push(player)
      players.push(player2)

      var table = new Table(shoe, players)

      table.deal()
      table.runningCount()
      table.hit(player)
      table.runningCount()

      expect(table.runCount).to.equal(-5)
    })
  })
  describe('winning and losing', function(){
    it('dealer has 21, player loses', function(){
      var shoe = new Shoe(['As', 'Ks', 'Qs', 'Js', '10s', 'Ac','As', 'Ks', 'Qs', 'Js', '10s', 'Ac'])
      var player = new Player()
      player.hand = ['As', '10s']
      var player2 = new Player()
      player2.hand = ['2s', '3s']

      var players = []

      players.push(player)
      players.push(player2)

      var table = new Table(shoe, players)

      expect(table.findWinner()).to.equal("dealer")
    })
    it('returns player if player wins', function() {
      var shoe = new Shoe(['As', 'Ks', 'Qs', 'Js', '10s', 'Ac','As', 'Ks', 'Qs', 'Js', '10s', 'Ac'])
      var player = new Player()
      var player2 = new Player()
      player.hand = ['2s', '3s']
      player2.hand = ['As', '10s']

      var players = []

      players.push(player)
      players.push(player2)

      var table = new Table(shoe, players)

      expect(table.findWinner()).to.equal("player")
    })

    it('returns dealer if player busts', function() {
      var shoe = new Shoe(['As', 'Ks', 'Qs', 'Js', '10s', 'Ac','As', 'Ks', 'Qs', 'Js', '10s', 'Ac'])
      var player = new Player()
      var player2 = new Player()
      player.hand = ['2s', '3s']
      player2.hand = ['10s', '10s', '10s' ]

      var players = []

      players.push(player)
      players.push(player2)

      var table = new Table(shoe, players)

      expect(table.findWinner()).to.equal("dealer")
    })

    it('dealer busts and player is good, player wins', function() {
      var shoe = new Shoe(['As', 'Ks', 'Qs', 'Js', '10s', 'Ac','As', 'Ks', 'Qs', 'Js', '10s', 'Ac'])
      var player = new Player()
      var player2 = new Player()
      player.hand = ['10s', '10s', '10s' ]
      player2.hand = ['2s', '3s']

      var players = []

      players.push(player)
      players.push(player2)

      var table = new Table(shoe, players)

      expect(table.findWinner()).to.equal("player")
    })

    it('is a tie', function() {
      var shoe = new Shoe(['As', 'Ks', 'Qs', 'Js', '10s', 'Ac','As', 'Ks', 'Qs', 'Js', '10s', 'Ac'])
      var player = new Player()
      var player2 = new Player()
      player.hand = ['2s', '3s']
      player2.hand = ['2s', '3s']

      var players = []

      players.push(player)
      players.push(player2)

      var table = new Table(shoe, players)

      expect(table.findWinner()).to.equal("push")
    })

  })

})
