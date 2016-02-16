var FollowToggle = require('./follow_toggle.js');

function UsersSearch(el){
  this.$el = $(el);
  this.input = this.$el.find('[name=username]');
  this.ul = this.$el.find('ul');
  this.input.on("input", this.handleInput.bind(this));
}

UsersSearch.prototype.handleInput = function (e) {
  e.preventDefault();
  $.ajax({
    type: "GET",
    url: "search",
    dataType: 'json',
    data: {
      query: this.input.val()
    },
    success: function(data) {
      console.log(data);
      this.renderResults(data);
    }.bind(this),
    error: function(data) {
      console.log("ERROR");
      console.log(data);
    }
  });
};

UsersSearch.prototype.renderResults = function (data) {
  this.ul.empty();
  var funUl = this.ul;
  data.forEach(function(obj){
    var funLi =
      "<li><a href='" + obj.id + "'>" + obj.username + "</a></li>";
    var followedText = obj.followed ? "followed" : "unfollowed";
    var funButton =
    "<button type='button' class='follow-toggle' name='button'" +
    "data-user-id=" + obj.id + " data-follow-state=" + followedText + ">" +
    "</button>";

    funUl.append(funLi).append(funButton);
  });
  $('button.follow-toggle').each(function(id, el){

    new FollowToggle(el);
  });
};

module.exports = UsersSearch;
