function FollowToggle($el) {
  this.$el = $($el);
  this.userId = this.$el.attr("data-user-id");
  this.followState = this.$el.attr("data-follow-state");
  // TODO ask next TA about how to do this in a better way
  this.$el.on('click', this.handleClick.bind(this));
  this.render();
 }

FollowToggle.prototype.handleClick = function (e) {
  e.preventDefault();
  if (this.followState === "unfollowed") {
    this.followState = "following";
    var ajaxType = "POST";
  } else {
    this.followState = "unfollowing";
    ajaxType = "DELETE";
  }
  this.render();
  $.ajax({
    type: ajaxType,
    url: "/users/" + this.userId + "/follow",
    dataType: 'json',
    data: {
      userId: this.userId
    },
    success: function(data){
      console.log(data);
      this.toggleState();
    }.bind(this),
    error: function(data) {
      console.log("ERROR");
      console.log(data);
    }
  });
};

FollowToggle.prototype.toggleState = function () {
  this.followState = this.followState === "followed" ?
    "unfollowed" : "followed";
  this.render();
};

FollowToggle.prototype.render = function () {
  if (this.followState === "following" ||
    this.followState === "unfollowing") {
    this.$el.prop("disabled");
  }

  var bText = (this.followState === "followed" ||
               this.followState === "following") ?
               "Unfollow" : "Follow";

  this.$el.text(bText);
};

module.exports = FollowToggle;
















//hello
