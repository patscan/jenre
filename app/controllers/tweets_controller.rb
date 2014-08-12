class TweetsController < ApplicationController
  respond_to :json

  def create
    hashtag = params[:hashtag]
    stream = []

    tweetz = Twitter.search("##{hashtag}", result_type: "recent").statuses
    tweetz.each do |tweet|
      stream << "@#{tweet.user.screen_name}: #{tweet.text}"
    end

    render json: stream.uniq
  end
end
