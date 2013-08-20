Jenre.Song = Backbone.Model.extend({

  urlRoot: '/songs.json',

  defaults: {
    rdio_id: 0,
    lyrics: "Sorry, no lyrics were found.",
    artist: "",
    title: ""
  }
});

