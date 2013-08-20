TweetsController < ApplicationController
  respond_to :json

  def create
    include ActionView::Helpers::DateHelper

    # hashtags = ["beatles", "jawbreaker"]
    hastags = params[:hashtags]
    stream = []

    hashtags.each do |hashtag|
      stream << Twitter.search("##{hashtag}",result_type: "recent").statuses.collect{|tweet| "@#{tweet.user.screen_name}: #{tweet.text} #{time_ago_in_words(tweet.created_at)}" }
    end
      
    render json: stream

    # Need a route to send the hashtags here; this code will return the tweet statuses as they come back
    # so the hashtags are being stored in an array in the js file; they are added to as users search for artists
    # the response replaces the content of the stream.

    # the hashtags will be stored, but the tweets will be not

    # the rails create action returns a stream of tweets
    # (so the show is the collection)

  end
end
