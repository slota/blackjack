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
      player.hand.push('Ah')
      expect(player.score()).to.equal(11)
    })
    // xit('deals two cards', function(){
    //   var hand = new Player(deck);
    //   hand.deal();
    //
    //   expect(hand.cards.length).to.equal(2);
    // })

    // it('deals cards with a suit and a value', function(){
    //   var hand = new Player(['2h', '2s']);
    //   hand.deal();
    //   console.log(hand.cards[0][hand.cards[0].length -1 ]);
    //   expect(hand.cards[0][hand.cards[0].length -1 ]).to.equal('h')
    // })
  })
})
