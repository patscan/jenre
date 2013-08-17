Jenre.AppView = Backbone.View.extend({

  events: {
    'click #submit-song-search' : 'lyricSearch'
  },

  lyricSearch: function() {
    var artistQuery = $('#artist').val();
    var songQuery = $('#song').val();
    var songObject = ({artist: artistQuery, song: songQuery});
    
    $.ajax({
      method: 'post',
      url: '/lyrics/',
      data: songObject
    }).done(function(response){ $('#submit-song-search').html(response);});
  }
});
