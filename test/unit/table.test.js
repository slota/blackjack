var expect = require('chai').expect;
var Table = require('../../app/unit/table')
var Shoe = require('../../app/unit/shoe')
var Player = require('../../app/unit/player')

describe('#table', function(){
  describe('hit', function(){

    it('accepts a deck and a player', function(){
      shoe = new Shoe(['As'])
      player = new Player()

      table = new Table(shoe, player)

      expect(table.shoe.cards).to.deep.equal(['As'])
    })

    it('deals a card', function(){
      shoe = new Shoe(['As'])
      player = new Player()

      table = new Table(shoe, player)

      table.hit(player)

      expect(table.player.hand).to.deep.equal(['As'])
    })

    it('should remove a card that has been dealt', function(){
      shoe = new Shoe(['As'])
      player = new Player()

      table = new Table(shoe, player)

      table.hit(player)

      expect(table.shoe.cards.length).to.equal(0)
    })

    it('should remove a card that has been dealt', function(){
      shoe = new Shoe(['Jc', '10s'])
      player = new Player()

      table = new Table(shoe, player)

      table.hit(player)
      table.hit(player)

      expect(table.player.hand).to.deep.equal(['Jc', '10s'])
    })

    it('should remove a card that has been dealt', function(){
      shoe = new Shoe(['Jc', '10s'])
      player = new Player()

      table = new Table(shoe, player)

      table.hit(player)
      table.hit(player)

      expect(table.player.hand).to.deep.equal(['Jc', '10s'])
    })
  })

  describe('deal', function(){
    it('deals two cards to a player', function(){
      shoe = new Shoe(['As', 'Ks'])
      player = new Player()

      table = new Table(shoe, player)

      table.deal()

      expect(table.player.hand).to.deep.equal(['As', 'Ks'])
    })

    it('removes two cards from the deck', function(){
      shoe = new Shoe(['As', 'Ks'])
      player = new Player()

      table = new Table(shoe, player)

      table.deal()

      expect(table.shoe.cards.length).to.equal(0)
    })
  })
})
