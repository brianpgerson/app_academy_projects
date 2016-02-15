var React = require('react'),
    ReactDOM = require('react-dom'),
    Header = require('./headers');

var tabData = [
  {title: "Dogs Barking", content: "woof woof woof woof"},
  {title: "Cats Meowing", content: "meow meow meow meow"},
  {title: "Crabs Clicking", content: "click click click click"},
  {title: "Horses Barking", content: "bark bark bark bark"}
];

var Tabs = React.createClass({
  getInitialState: function(){
    return ({tabs: tabData, selectedTabIdx: null });
  },
  headerClicked: function(index, e) {
    this.setState({selectedTabIdx: index});
  },
  render: function() {
    if (this.state.selectedTabIdx !== null) {
      var articleText = this.state.tabs[this.state.selectedTabIdx].content;
    } else {
      articleText = "Select a tab!";
    }
    var headerListItems = this.state.tabs.map(function(header, index){
      return <Header
                title={header.title}
                content={header.content}
                key={index}
                className={index === this.state.selectedTabIdx ? 'selected' : 'not'}
                headerCallback={this.headerClicked.bind(this, index)}
              />
          }.bind(this));

    return (
      <div>
        <ul>
          {headerListItems}
        </ul>
        <article>
          {articleText}
        </article>
      </div>
    );
  }
});

module.exports = Tabs;
