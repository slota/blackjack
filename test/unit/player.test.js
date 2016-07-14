var expect = require('chai').expect;
var Player = require('../../app/unit/player')

describe('Player', function(){
  var deck = ['2h', '2s', '2d', '2c',
  '3h', '3s', '3d', '3c',
  '4h', '4s', '4d', '4c',
  '5h', '5s', '5d', '5c',
  '6h', '6s', '6d', '6c',
  '7h', '7s', '7d', '7c',
  '8h', '8s', '8d', '8c',
  '9h', '9s', '9d', '9c',
  '10h', '10s', '10d', '10c',
  'Jh', 'Js', 'Jd', 'Jc',
  'Qh', 'Qs', 'Qd', 'Qc',
  'Kh', 'Ks', 'Kd', 'Kc',
  'Ah', 'As', 'Ad', 'Ac']

  describe('#value', function(){
    it('starts with zero', function(){
      player = new Player()

      expect(player.score()).to.equal(0)
    })
    it('adds the value of a card', function(){
      player = new Player()

      player.hand.push("3h")
      expect(player.score()).to.equal(3)
    })
    it('can add the value of a 2 digit number', function(){
      player = new  Player()
      player.hand.push('10d')
      expect(player.score()).to.equal(10)
    })
    it('can add a face card', function(){
      player = new Player()
      player.hand.push('Kh')
      expect(player.score()).to.equal(10)
    })
    it('can add two cards', function(){
      player = new Player()
      player.hand.push('Jd')
      player.hand.push('Jh')

      expect(player.score()).to.equal(20)
    })
    it('can distinguish one ace in a hand', function(){
      player = new Player()
      player.hand.push('5d')
      player.hand.push('Ah')

      expect(player.score()).to.equal(16)
    })
    it('counts an ace as 1 when an 11 would call a bust', function(){
      player = new Player()
      player.hand.push('5d')
      player.hand.push('2d')
      player.hand.push('Jh')
      player.hand.push('Ah')

      expect(player.score()).to.equal(18)
    })
    it('can distinguish multiple aces in a hand', function(){
      player = new Player()
      player.hand.push('5d')
      player.hand.push('Ad')
      player.hand.push('2d')
      player.hand.push('Ah')
      player.hand.push('2c')
      player.hand.push('Jh')
      expect(player.score()).to.equal(21)
    })
    it('has 25 as the player\'s score', function(){
      player = new Player()
      player.hand.push('Jd')
      player.hand.push('Jh')
      player.hand.push('5s')

      expect(player.score()).to.equal(25)
    })
    it('checks status of player', function(){
      player = new Player()
      player.hand.push('Jd')
      player.hand.push('Jh')
      player.hand.push('5s')
      expect(player.statusType()).to.equal(false)
    })
  })
  describe('#sort', function(){
  	it('returns an instanceOf Array', function(){
      player = new Player()
      player.hand.push('Jd')
      player.cardSort()
  	  expect(player.hand).to.be.instanceOf(Array)
  	})
    it('rerturns an array with same length as hand', function(){
      player = new Player()
      player.hand.push('Jd')
      var preSort = player.hand.length
      player.cardSort()
      expect(preSort == player.hand.length).to.equal(true)
    })
    it('Pushes the ace to the back on the array', function(){
      player = new Player()
      player.hand.push('Ad')
      player.hand.push('Jd')
      player.hand.push('Jh')
      player.hand.push('5s')
      player.cardSort()
    	expect(player.hand[player.hand.length - 1]).to.equal('Ad')
    })
    it('Can push two aces to the back of the array', function(){
      player = new Player()
      player.hand.push('Ad')
      player.hand.push('Jd')
      player.hand.push('Ak')
      player.hand.push('Jh')
      player.hand.push('5s')
      player.cardSort()
    	expect(player.hand[player.hand.length - 2].slice(0,1)).to.equal('A')
    })
    it('Player\'s hand remains the same', function(){
      player = new Player()
      player.hand.push('Ad')
      player.hand.push('Jd')

      player.score()
      expect(player.hand).to.deep.equal(['Ad', 'Jd'])
    })

  })
})
