var Hashtags = Backbone.Collection.extend({
  
  model: Jenre.Hashtag,
  localStorage: new Backbone.LocalStorage("LocalTweets")

})

Jenre.hashtags = new Hashtags();
