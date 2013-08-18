class SessionsController < ApplicationController
  def create
    session[:token] = request.env["omniauth.auth"]["extra"]["access_token"].to_s
    # Create user model and save stuff here.
    redirect_to root_path
  end
end
