function InfiniteTweets(el) {
  this.$el = $(el);
  this.max_created_at = null;
  this.$el.find('.fetch-more').on('click', this.fetchTweets.bind(this));
}

InfiniteTweets.prototype.fetchTweets = function (e) {
  e.preventDefault();
  if (this.max_created_at === null)
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: '/feed',
    success: function(data) {
      this.insertTweets(data);
    }
  });
};

InfiniteTweets.prototype.insertTweets = function (data) {
  var funUl = this.$el.find('#feed');
  data.forEach( function(tweet) {
    var newLi = "<li>" + JSON.stringify(tweet) + "</li>";
    funUl.append(newLi);
  });

};

module.exports = InfiniteTweets;
