var React = require('react');
var ToyIndexItem = require('./toyIndexItem');

var ToysIndex = React.createClass({
  render: function(){
    var allToys;

      if (this.props.toys) {
        allToys = this.props.toys.map(function(toy, index){
          return (
            <ToyIndexItem
              key={index}
              id={index}
              toy={toy}
              />
          );
        });
      } else {
        return <div>no toys, sorry.</div>;
      }
    return (
      <div>
        {allToys}
      </div>
    );
  }
});

module.exports = ToysIndex;
