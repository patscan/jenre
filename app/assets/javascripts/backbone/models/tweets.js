var TweetList = Backbone.Collection.extend({

  model: Jenre.Tweet,
  localStorage: new Backbone.LocalStorage("LocalTweets")

})

Jenre.tweets = new TweetList();
