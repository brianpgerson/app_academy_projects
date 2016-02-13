function TweetCompose(el) {
  this.$el = $(el);

  this.$el.find("input[type=submit]").on("click", this.submit.bind(this));

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
};

module.exports = TweetCompose;
