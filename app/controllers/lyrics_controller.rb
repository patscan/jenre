class LyricsController < ApplicationController
  respond_to :json
  
  def create
    artist = params[:artist]
    song = params[:song]

    response = HTTParty.get('http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect',
                  query: {artist: artist, song: song})

    lyrics = response['GetLyricResult']['Lyric']
    render text: lyrics.gsub(/\n/, "<br/>")
  end
end
