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

      expect(table.runningCount()).to.equal(1)
    })

    it('keeps track of the true count', function(){
      shoe = new Shoe(['As', 'Ks', 'Qs', 'Js', '10s', 'Ac'])
      player = new Player()

      table = new Table(shoe, [player])

      table.deal()
      table.hit(player)

      expect(table.trueCount()).to.equal(-3)
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
      expect(table.runningCount()).to.equal(-4)
    })
  })
})
