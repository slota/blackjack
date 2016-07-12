var Table = React.createClass({
  playerLoop: function(){
    var array = []
    var playerArray = ['croc', 'hippo', 'rabbit', 'snake']
    for (var i=0; i < this.props.players; i++){
        array.push(playerArray[i])
        console.log(array)
    }
    return array
  },
  render: function() {
    var pics = this.playerLoop();
    var picArr = pics.map(function(val,index) {
      var card = val
      var ind = index
      return <img style={{height: '100px'}} className="pic" id={'image'+ind} key={'image'+ind} src={"../../images/characters/"+ card +".jpg"} />

    })
    return (
      <div id="table">
        <div id="dealer">
          <img className="eldealer" src={"../../images/characters/dealer.jpg"} />
        </div>
        <div id ="players">
          {picArr}
        </div>
        <div>
          <img id="humanPlayer" style={{height: '100px'}} src={"../../images/characters/player.jpg"} />
        </div>
        <button id='hit' className="deal btn btn-primary"> HIT!!</button>
        <button id='stay' className="deal btn btn-danger"> STAY!!</button>

      </div>
    )
  }
})

module.exports = Table
