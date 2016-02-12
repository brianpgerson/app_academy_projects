function FollowToggle($el) {
  this.$el = $el;
  this.$user_id = $($el).attr('data-user-id');
  this.$followState = $($el).attr('data-follow-state');

  $(this.$el).on('click', this.handleClick.bind(this));
  this.render();
}

FollowToggle.prototype.handleClick = function (e) {
  e.preventDefault();
  debugger;
  if (this.$followState === "unfollowed") {
    var ajaxType = "POST";
    var ajaxUrl = "/users/" + this.$user_id + "/follow";
  } else {
    ajaxType = "DELETE";
    ajaxUrl = "/users/" + this.$user_id + "/follow";
  }
  $.ajax({
    type: ajaxType,
    url: ajaxUrl,
    dataType: 'json',
    success: function(data){
      this.toggleState(data);
    }.bind(this)
  });
};

FollowToggle.prototype.toggleState = function (data) {
  this.$followState = this.$followState === "followed" ?
    "unfollowed" : "followed";
  this.render();
  console.log(data);
};

FollowToggle.prototype.render = function () {
  var bText = this.$followState === "followed" ?
    "Unfollow" : "Follow";

  this.$el.innerHTML = bText;
};

module.exports = FollowToggle;
