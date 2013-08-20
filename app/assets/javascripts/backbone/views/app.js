Jenre.AppView = Backbone.View.extend({

  events: {
    'click #get-song' : 'getSong'
  },

  initialize: function() {
    this.listenTo(Jenre.songs, 'add', this.playSong);
    this.listenTo(Jenre.songs, 'add', this.addSongToStream);
    this.listenTo(Jenre.songs, 'add', this.displayLyrics);
    this.listenTo(Jenre.hashtags, 'add', this.fetchTweets);
    this.listenTo(Jenre.tweets, 'add', this.displayTweets);
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
    $('#content-container').fadeIn();
    $('#rdio-api').rdio().play(song.get("rdio_id"));
  },

  addSongToStream: function(song) {
    Jenre.hashtags.create({ body: song.get("artist") });
  },

  fetchTweets: function() {
    $.ajax({
      method: 'post',
      url: '/tweets/',
      data: {hashtags: Jenre.hashtags.pluck("body")}
    }).done(function(tweetArray) {
      _.each(tweetArray, function(tweet) {
        Jenre.tweets.create({ content: tweet })
      });
    });
  },

  displayLyrics: function(song) {
    var view = new Jenre.LyricView({ model: song });
    $('#lyrics-container').html( view.render().el );
  },

  displayTweet: function(tweet) {
    var view = new Jenre.TweetView({ model: tweet });
    $('#tweets-container').html( view.render().el );
  },

  displayTweets: function() {
    Jenre.tweets.each(this.displayTweet, this);
  }

});



