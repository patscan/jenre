Jenre.AppView = Backbone.View.extend({

  events: {
    'click #submit-song-search' : 'lyricSearch',
  },

  lyricSearch: function() {
    var artistQuery = $('#artist').val();
    var songQuery = $('#song').val();
    var songObject = ({artist: artistQuery, song: songQuery});
    var rdio_Id, lyricz

    Jenre.song = new Jenre.Song();

    $.ajax({
      method: 'post',
      url: '/lyrics/',
      data: songObject
    }).done(function(response){ 
      lyricz = response;
      Jenre.song.set({lyrics: lyricz});
  });

    $.ajax({
      method: 'post',
      url: '/rdio_id/',
      data: songObject
    }).done(function(response){ 
      rdio_Id = response;
      Jenre.song.set({rdio_id: rdio_Id});
    });

  }
});
