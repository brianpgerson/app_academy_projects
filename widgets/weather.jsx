var React = require('react'),
    ReactDOM = require('react-dom');

var Weather = React.createClass({
  getInitialState: function(){
    return(
      {weatherType: "...discovering...weather...", fahrenheit: "...calculating...temp..."}
    );
  },
  componentDidMount: function(){
    navigator.geolocation.getCurrentPosition(function(data) {
        var lat = data.coords.latitude;
        var long = data.coords.longitude;
        this.weatherRequest(lat, long);
      }.bind(this)
    );
  },
  weatherRequest: function(lat, long) {
    var getURL =
      "http://api.openweathermap.org/data/2.5/weather?lat=" +
      lat + "&lon=" + long + "&appid=645c5d39c7603f17e23fcaffcea1a3c1";

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState === XMLHttpRequest.DONE ) {
          if(xmlhttp.status === 200){
            var weather = JSON.parse(xmlhttp.responseText);
            var fahrenheit =
              Math.floor((((weather.main.temp - 273) * 1.8) + 32));
            var weatherType = weather.weather[0].main;
            this.setState({weatherType: weatherType, fahrenheit: fahrenheit});
          }
          else if(xmlhttp.status === 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
    }.bind(this);

    xmlhttp.open("GET", getURL, true);
    xmlhttp.send();
  },
  render: function(){
      return (
      <div className="weather">
        The weather outside is: {this.state.weatherType}
        <br></br>
        Degrees Fahrenheit: {this.state.fahrenheit}
      </div>
    );
  }
});

module.exports = Weather;
