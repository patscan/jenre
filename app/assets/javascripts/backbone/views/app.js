Jenre.AppView = Backbone.View.extend({

  //el: $('#jenre-app'),

  events: {
    'click #get-song' : 'getSong'
    // 'click #play' : 'playSong'
  },

  initialize: function() {
    this.listenTo(Jenre.songs, 'add', this.playSong);
  },

  getSong: function() {
    var artistQuery = $('#artist').val();
    var songQuery = $('#song').val();
    var songObject = ({artist: artistQuery, song: songQuery});
    var rdio_Id, lyricz

    $.ajax({
      method: 'post',
      url: '/lyrics/',
      data: songObject
    }).done(function(response){ 
      lyricz = response;
    }).done(function() {
    $.ajax({
      method: 'post',
      url: '/rdio_id/',
      data: songObject
    }).done(function(response){ 
      rdio_Id = response;
    }).done(function(){

      Jenre.songs.create({lyrics: lyricz, rdio_id: rdio_Id});
      Jenre.rdio_id = rdio_Id;
      });
    })
  },

  playSong: function(song) {
    $('#api').rdio().play(song.get("rdio_id"));
  }
});

