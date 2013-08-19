class RdioIdController < ApplicationController
  respond_to :json

  def create
    artist = params[:artist].to_s.gsub(' ', '%20')
    title = params[:song].to_s.gsub(' ', '%20')
    echonest_api_key = 'AKDCBHCZGMUUXMPNA'

    response = HTTParty.get(
      "http://developer.echonest.com/api/v4/song/search?api_key=#{echonest_api_key}&format=json&results=1&artist=#{artist}&title=#{title}&bucket=id:rdio-US&bucket=tracks&limit=true"
      )

    rdio_id = response["response"]["songs"][0]["tracks"][0]["foreign_id"][-8..-1]
    render text: rdio_id
  end

end
