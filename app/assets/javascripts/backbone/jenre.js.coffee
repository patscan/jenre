#= require_self
#= require_tree ./templates
#= require_tree ./models
#= require_tree ./views
#= require_tree ./routers

window.Jenre =
  Models: {}
  Collections: {}
  Routers: {}
  Views: {}

  init: ->
    appView = new Jenre.AppView({el: $('#jenreapp')})

$(document).ready ->
  Jenre.init()
