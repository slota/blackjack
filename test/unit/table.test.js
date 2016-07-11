var expect = require('chai').expect;
var Table = require('../../app/unit/table')
var Shoe = require('../../app/unit/shoe')
var Player = require('../../app/unit/player')

describe('#table', function(){
  it("accepts a deck and a player", function(){
    shoe = new Shoe(["As"])
    player = new Player()

    table = new Table(shoe, player)

    expect(table.shoe.cards).to.deep.equal(["As"])
  })
})
