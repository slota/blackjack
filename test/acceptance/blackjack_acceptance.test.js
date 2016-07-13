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
})
