Jenre.TweetView = Marionette.ItemView.extend({

  model: Jenre.Tweet,

  template: JST["backbone/templates/tweet"],

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html( this.template(this.model.toJSON() ));
    return this;
  }
})
Jenre.TweetCollectionView = Marionette.CollectionView.extend({
  childView: Jenre.TweetView,
  tag: '#tweets-container'
});
