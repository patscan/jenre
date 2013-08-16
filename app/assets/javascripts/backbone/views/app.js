$(function(){
  Jenre.AppView = Backbone.View.extend({
    el: $('#jenreapp'),

    events: {
      'click #submit-song-search' : 'test'
    },

    test: function() {
      alert("yo");
      console.log("yo");
    }
  });
  
  new Jenre.AppView();
});
