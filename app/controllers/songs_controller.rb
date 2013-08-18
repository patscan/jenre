class SongsController < ApplicationController
  respond_to :json

  def index
    respond_with Song.all
  end

  def create
    song = Song.create(rdio_id: params[:rdio_id], lyrics: params[:lyrics])
    render json: song
  end

  def show
    respond_with Song.find(params[:id])
  end
end
