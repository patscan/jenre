class TweetsController < ApplicationController
  respond_to :json

  def create
    hashtags = params[:hashtags]
    stream = []

    hashtags.each do |hashtag|
      stream << Twitter.search("##{hashtag}", result_type: "recent").statuses.collect do |tweet| 
        "@#{tweet.user.screen_name}: #{tweet.text}"
      end
    end
  
    render json: stream
  end
end
