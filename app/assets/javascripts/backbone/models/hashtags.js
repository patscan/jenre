var Hashtags = Backbone.Collection.extend({
  
  model: Jenre.Hashtag,
  localStorage: new Backbone.LocalStorage("LocalHashtags")

})

Jenre.hashtags = new Hashtags();
