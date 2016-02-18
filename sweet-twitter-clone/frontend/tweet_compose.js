function TweetCompose(el) {
  this.$el = $(el);

  this.$el.find("input[type=submit]").on("click", this.submit.bind(this));
  this.$el.find(".tweet-content").on("input", this.charCount.bind(this));

  this.$el.find(".add-mention").on("click", this.addMentionedUser.bind(this));
  this.$el.find(".mentioned-users")
    .on("click", ".remove-mention", this.removeMentionedUser.bind(this));
}

TweetCompose.prototype.submit = function (e) {
  e.preventDefault();
  var allInputs = this.$el.find(":input");
  var data = allInputs.serializeJSON();
  allInputs.prop('disable');
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: '/tweets',
    data: data,
    success: function(data1) {
      this.handleSucess(data1);
    }.bind(this),
    error: function(data1) {
      console.log("ERROR");
      console.log(data1);
    }
  });
};

TweetCompose.prototype.handleSucess = function (data) {
  this.clearInput();
  var ulTag = this.$el.attr('data-tweetfinder');
  var coolLi = "<li>" + JSON.stringify(data) + "</li>";
  $("#" + ulTag).prepend(coolLi);
};

TweetCompose.prototype.clearInput = function () {
  this.$el.find(":input").val('');
  this.$el.find(":input").prop('disable');
  this.$el.find(".mentioned-users").empty();
};

TweetCompose.prototype.charCount = function () {
  var count = this.$el.find(".tweet-content").val().length;
  var remaining = "Remaining Characters: " + (140 - count);
  this.$el.find(".chars-left").text(remaining);
};

TweetCompose.prototype.addMentionedUser = function (e) {
  e.preventDefault();
  this.$el.find('.mentioned-users').append(this.$el.find('script').html());
};

TweetCompose.prototype.removeMentionedUser = function (e) {
  e.preventDefault();
  $(e.currentTarget).parent().remove();
};

module.exports = TweetCompose;
