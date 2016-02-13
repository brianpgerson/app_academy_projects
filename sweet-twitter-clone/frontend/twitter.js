var FollowToggle = require ('./follow_toggle.js');
var UsersSearch = require ('./users_search.js');
var TweetCompose = require ('./tweet_compose.js');

$(function(){

  $('button.follow-toggle').each(function(id, el){
    new FollowToggle(el);
  });

  $('nav.users-search').each(function(id, el) {
    new UsersSearch(el);
  });

  $('form.tweet-compose').each(function(id, el) {
    new TweetCompose(el);
  });

});
