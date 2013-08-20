var SongsList = Backbone.Collection.extend({

  model: Jenre.Song,
  url: '/songs.json'

});

Jenre.songs = new SongsList();

