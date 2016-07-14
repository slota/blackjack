require('../helper');


before(function() {

  browser.baseUrl = 'http://localhost:3000/'
});

beforeEach(function() {
  return browser.ignoreSynchronization = true;
});

describe('Given I visit /', function(){
  it('should display a title', function(){
    browser.get('/');
    element(by.tagName('h1')).getText().then(function(result){
      expect(result).to.equal('Welcome to the BlackJack');
    })
    element(by.id('startGame')).isDisplayed().then(function(result){
      expect(result).to.equal(true)
    })
    element(by.id('startGame')).getText().then(function(result){
      expect(result).to.equal("Start Game")
    })
    element(by.id('selectPlayers')).isDisplayed().then(function(result){
      expect(result).to.equal(true)
    })
    element(by.cssContainingText('option', '4')).click();
    element(by.id('selectPlayers')).getAttribute('value').then(function(result){
      expect(result).to.equal('4')
    })
    element(by.css('#dealer')).isPresent().then(function(result){
      expect(result).to.equal(false)
    })
    element(by.id('startGame')).click()
    element(by.id("homepage")).isPresent().then(function(result){
      expect(result).to.equal(false)
    })
  })
  it('should display player and robots', function(){
    browser.get('/');
    element(by.cssContainingText('option', '3')).click();
    element(by.id('startGame')).click();

    element(by.id('player0')).isDisplayed().then(function(result){
      expect(result).to.equal(true)
    })
    element(by.id('player1')).isDisplayed().then(function(result){
      expect(result).to.equal(true)
    })
    element(by.id('hit')).isDisplayed().then(function(result){
      expect(result).to.equal(true)
    })
    element(by.id('stay')).isDisplayed().then(function(result){
      expect(result).to.equal(true)
    })
  })
  it('deals a card to players', function(){

    element(by.css('.card')).isDisplayed().then(function(result){
      expect(result).to.equal(true)
    })
  })
  it('deals cards to dealer', function(){
    element(by.css('#player0')).isDisplayed().then(function(result){
      expect(result).to.equal(true)
    })

  })
  it('player can hit', function(){
    element(by.id('hit')).click()
    var cards = element.all(protractor.By.css('.card'))
    cards.count().then(function(counter) {
      console.log(counter);
      expect(counter).to.equal(11)
    })
  })
  it('player is told they bust', function(){
    element(by.id('hit')).click()
    element(by.id('hit')).click()
    element(by.id('hit')).click()
    element(by.id('hit')).click()
    element(by.id('hit')).click()
    element(by.id('hit')).click()
    element(by.id('hit')).click()
    element(by.id('hit')).click()
    element(by.id('hit')).click()
    element(by.id('hit')).click()

    element(by.css('#bustMessage')).getText().then(function(result){
      expect(result).to.equal('aaaaaand boom goes the dynamite')
    })
  })
  it('player cannot hit when they bustnul', function(){
    element(by.id('hit')).click()
    element(by.id('hit')).click()
    element(by.id('hit')).click()
    element(by.id('hit')).click()
    element(by.id('hit')).click()
    element(by.id('hit')).click()
    element(by.id('hit')).click()
    element(by.id('hit')).click()
    element(by.id('hit')).click()
    element(by.id('hit')).click()

    var cards = element.all(protractor.By.css('.card'))
    cards.count().then(function(counter) {
    element(by.id('hit')).click()
      cards.count().then(function(newCount) {
        expect(newCount == counter).to.equal(true)
      })
    })
  })
  it('displays running count', function(){
    element(by.id('runningCount')).isDisplayed().then(function(result){
      expect(result).to.equal(true)
    })
  })
  it('displays true count', function(){
    element(by.id('trueCount')).isDisplayed().then(function(result){
      expect(result).to.equal(true)
    })
  })
})
describe('Given I visit /', function(){
  it('should be able to stay', function(){
    browser.get('/');
    element(by.cssContainingText('option', '0')).click();
    element(by.id('startGame')).click();
    element(by.id('hit')).click()
    element(by.id('stay')).click()
    var cards = element.all(protractor.By.css('.card'))
    cards.count().then(function(counter) {
      element(by.id('hit')).click()
      cards.count().then(function(newCount) {
        expect(newCount == counter).to.equal(true)
      }).then(function(){
        element(by.id('thaNewDeal')).getText().then(function(text){
          expect(text).to.equal('deal a new deal')
        }).then(function(){
          element(by.id('thaNewDeal')).click()
          var cards = element.all(protractor.By.css('.card'))
          cards.count().then(function(count){
            expect(count).to.equal(4)
          })
        })
      })

    })
  })
})
