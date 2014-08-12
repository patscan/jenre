Jenre.AppView = Backbone.View.extend({

  events: {
    'click #get-song' : 'getSong',
    'keyup #song' : 'wasEnterPressed'
  },

  initialize: function() {
    this.listenTo(Jenre.songs, 'add', this.playSong);
    this.listenTo(Jenre.songs, 'add', this.addSongToStream);
    this.listenTo(Jenre.songs, 'add', this.displayLyrics);
    this.listenTo(Jenre.songs, 'add', this.fetchTweets);
    //this.listenTo(Jenre.tweets, 'add', this.displayTweets);
  },

  getSong: function() {
    var artistQuery = $('#artist-search').val(),
        songQuery = $('#song').val(),
        songObject = ({ artist: artistQuery, song: songQuery }),
        rdio_Id, lyricz;

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

  wasEnterPressed: function(e) {
    if (e.keyCode == 13) {
      this.getSong();
    }
  },

  playSong: function(song) {
    $('#content-container').fadeIn();
    $('#rdio-api').rdio().play(song.get("rdio_id"));
  },

  addSongToStream: function(song) {
    Jenre.hashtags.reset({ body: song.get("artist") });
  },

  fetchTweets: function() {
    var artist = $('#artist-search').val(); 
    $.ajax({
      method: 'post',
      url: '/tweets/',
      data: { hashtag : artist }
    }).done(function(tweetArray) {
      var tweetz = [];
      _.each(tweetArray, function(tweet) {
        tweetz.push( {content: tweet} );
      });
      Jenre.tweets.reset( tweetz );
    });

    this.displayTweets();
  },

  displayLyrics: function(song) {
    var view = new Jenre.LyricView({ model: song });
    $('#lyrics-container').html( view.render().el );
  },

  displayTweet: function(tweet) {
    var view = new Jenre.TweetView({ model: tweet });
  },

  displayTweets: function() {
    var view = new Jenre.TweetCollectionView({
      collection: Jenre.tweets
    });

    $('#tweets-container').html( view.render().el );
  }

});



