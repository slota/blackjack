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

    element(by.id('dealer')).isDisplayed().then(function(result){
      expect(result).to.equal(true)
    })
    element(by.id('image0')).isDisplayed().then(function(result){
      expect(result).to.equal(true)
    })
    element(by.id('humanPlayer')).isDisplayed().then(function(result){
      expect(result).to.equal(true)
    })
    element(by.id('hit')).isDisplayed().then(function(result){
      expect(result).to.equal(true)
    })
    element(by.id('stay')).isDisplayed().then(function(result){
      expect(result).to.equal(true)
    })
  })
})
