var React = require('react');
var BenchStore = require('../stores/benchStore');
var ApiUtil = require('../util/apiUtil.js');

var Map = React.createClass({
  componentDidMount: function(){
    BenchStore.addListener(this._onChange);
    var mapDOMNode = this.refs.map;
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };

    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    this.listenForMove();
  },

  listenForMove: function(){
    google.maps.event.addListener(this.map, 'idle', function(){
      var LatLngBounds = this.getBounds();
      var bne = LatLngBounds.getNorthEast();
      var bsw = LatLngBounds.getSouthWest();
      var boundaries = {
            bounds: {
              northEast: {lat: bne.lat(), lng: bne.lng()},
              southWest: {lat: bsw.lat(), lng: bsw.lng()}
            }
          };
      ApiUtil.fetchBenches(boundaries);
    });
  },

  setNullOnAll: function(oldMarkers) {
    for (var i = 0; i < oldMarkers.length; i++) {
      oldMarkers[i].setMap(null);
    }
  },

  _onChange: function(){
    var benchObj = BenchStore.all();

    var benches = Object.keys(benchObj).map(function(id){
      return new google.maps.Marker({
        position: {lat: benchObj[id].lat, lng: benchObj[id].lng },
        map: this.map,
        title: benchObj[id].description
      });
    });

    this.markers = this.markers || benches;
    var markerTitles = this.markers.map(function(marker){
      return marker.title;
    });

    var benchTitles = benches.map(function(bench){
      return bench.title;
    });

    var outOfBoundsMarkers = this.markers.filter(function(marker){
      return benchTitles.indexOf(marker.title) < 0;
    });

    this.setNullOnAll(outOfBoundsMarkers);


    benches.forEach(function(benchMarker){

      var infowindow = new google.maps.InfoWindow({
        content: benchMarker.title
      });

      benchMarker.addListener('click', function() {
        infowindow.open(this.map, benchMarker);
      });

      this.markers.push(benchMarker);

      benchMarker.setMap(this.map);
    }.bind(this));
  },

  render: function(){
    return (
      <div className="map" ref="map">
      </div>
    );
  }
});

module.exports = Map;
