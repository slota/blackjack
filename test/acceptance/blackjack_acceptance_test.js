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
      expect(result).to.be.True
    })
    element(by.id('startGame')).getText().then(function(result){
      expect(result).to.equal("Start Game")
    })
    element(by.id('selectPlayers')).isDisplayed().then(function(result){
      expect(result).to.be.True
    })
    element(by.cssContainingText('option', '4')).click();
    element(by.id('selectPlayers')).getAttribute('value').then(function(result){
      expect(result).to.equal('4')
    })

  })
})
