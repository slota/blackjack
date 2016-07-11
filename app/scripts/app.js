var React = window.React = require('react'),
    ReactDOM = require("react-dom");

var TodoApp = React.createClass({

  render: function() {
    return (
      <h1>Welcome to the BlackJack</h1>
    );
  }
});

ReactDOM.render(<TodoApp />, document.getElementById('app'));
