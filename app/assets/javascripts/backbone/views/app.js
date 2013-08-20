Jenre.AppView = Backbone.View.extend({

  //el: $('#jenre-app'),
  // create hashtags collection and fetch that; 
  // then add to it with click of get-song

  events: {
    'click #get-song' : 'getSong'
    // 'click #get-song' : 'addSongToStream'
    // 'click #play' : 'playSong'
  },

  initialize: function() {
    var hashtags =  ["yo"];
    this.listenTo(Jenre.songs, 'add', this.playSong);
    this.listenTo(Jenre.songs, 'add', this.addSongToStream);

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

      Jenre.songs.create({lyrics: lyricz, rdio_id: rdio_Id, artist: artistQuery});
      // Jenre.rdio_id = rdio_Id;
      });
    })
  },

  playSong: function(song) {
    $('#api').rdio().play(song.get("rdio_id"));
  },

  addSongToStream: function() {
    Jenre.songs.each(function(song) { console.log(song.get("artist")) });
    // alert(_.map(Jenre.songs, function(song){ return song.get("artist") }));
    // this.hashtags.push($('#artist').val());
    // console.log(this.hashtags);
  }
});

