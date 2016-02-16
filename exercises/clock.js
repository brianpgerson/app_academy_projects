function Clock () {
  // 1. Create a Date object.
  // 2. Store the hours, minutes, and seconds.
  // 3. Call printTime.
  // 4. Schedule the tick at 1 second intervals.
  this.currentTime = new Date();
  this.hours = this.currentTime.getHours();
  this.minutes = this.currentTime.getMinutes();
  this.seconds = this.currentTime.getSeconds();
}
Clock.prototype.addPadding = function(number) {
  if (number.toString().length < 2) {
    return "0" + number.toString();
  } else {
    return number.toString();
  }
};

Clock.prototype.printTime = function () {
  // Format the time in HH:MM:SS
  // Use console.log to print it.
  var time =
    this.addPadding(this.hours) +
    ":" + this.addPadding(this.minutes) +
    ":" + this.addPadding(this.seconds);
  console.log(time);
};

Clock.prototype._tick = function () {
  // 1. Increment the time by one second.
  // 2. Call printTime.
  if (this.seconds < 59) {
    this.seconds += 1;
  } else {
    this.seconds = 0;
    this.minutes += 1;
  }
  if (this.minutes === 60) {
    this.minutes = 0;
    this.hours += 1;
  }
  if (this.hours === 24) {
    this.hours = 0;
  }

  this.printTime();
};

var clock = new Clock();
setInterval(clock._tick.bind(clock), 1000);
