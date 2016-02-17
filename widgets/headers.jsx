var React = require('react'),
  ReactDOM = require('react-dom');

var Header = React.createClass({
  //TODO ask about this bullshit
  getInitialState: function(){
    return ({
      title: this.props.title,
      content: this.props.content,
    });
  },
  render: function() {
    return(
      <li>
        <a href="#" className={this.props.className} onClick={this.props.headerCallback}>{this.state.title}</a>
      </li>
    );
  }
});

module.exports = Header;
