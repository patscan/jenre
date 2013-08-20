Jenre.AppView = Backbone.View.extend({

  events: {
    'click #get-song' : 'getSong'
  },

  initialize: function() {
    this.listenTo(Jenre.songs, 'add', this.playSong);
    this.listenTo(Jenre.songs, 'add', this.addSongToStream);
    this.listenTo(Jenre.songs, 'add', this.displayLyrics);
    this.listenTo(Jenre.hashtags, 'add', this.fetchTweets);
  },

  getSong: function() {
    var artistQuery = $('#artist').val();
    var songQuery = $('#song').val();
    var songObject = ({ artist: artistQuery, song: songQuery });
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

      Jenre.songs.create({
        lyrics: lyricz, 
        rdio_id: rdio_Id, 
        artist: artistQuery,
        title: songQuery
        });
      });
    })
  },

  playSong: function(song) {
    $('#api').rdio().play(song.get("rdio_id"));
  },

  addSongToStream: function(song) {
    Jenre.hashtags.create({ body: song.get("artist") });
  },

  fetchTweets: function() {
    $.ajax({
      method: 'post',
      url: '/tweets/',
      data: {hashtags: Jenre.hashtags.pluck("body")}
    }).done(function(response) {
      console.log(response);
    });
  },

  displayLyrics: function(song) {
    var view = new Jenre.LyricView({ model: song });
    $('#get-song').append( view.render().el );
  }

});



