Jenre.LyricView = Backbone.View.extend({

  template: JST["backbone/templates/lyric"],

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html( this.template(this.model.toJSON() ));
    return this;
  }
})
