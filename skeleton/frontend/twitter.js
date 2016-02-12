var FollowToggle = require ('./follow_toggle.js');

$(function(){

  $('button.follow-toggle').each(function(id, el){
    new FollowToggle(el);
  });

});
