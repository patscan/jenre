var SongsList = Backbone.Collection.extend({

  url: '/songs.json',

  model: Jenre.Song
});

Jenre.songs = new SongsList();

