var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactCSSTransitionGroup = require('react-addons-css-transition-group'),
    Input = require('./input');

var AutoComplete = React.createClass({
  getInitialState: function() {
    return ({names: this.props.names, currentSearch: ""});
  },
  handleInputChanges: function(event){
    this.setState({currentSearch: event.target.value});
  },
  handleClickedName: function(event){
    var newVal = event.target.innerHTML;
    var funput = document.getElementsByClassName('funput')[0];
    funput.value = newVal;
  },
  render: function() {
    var matchNames = this.state.names.filter(function(name) {
      return (name.search(this.state.currentSearch) === 0 &&
        this.state.currentSearch !== "");
    }.bind(this));

    var displayedNames = matchNames.map(function(name, index){
      return (
        <li
        onClick={this.handleClickedName}
        className="nameStuff"
        key={index}>{name}</li>
      );
    }.bind(this));

    return (
      <div>
        <Input inputCallback={this.handleInputChanges}/>
        <ul>
          <ReactCSSTransitionGroup
            transitionName="auto"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            >
            {displayedNames}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }
});

module.exports = AutoComplete;
