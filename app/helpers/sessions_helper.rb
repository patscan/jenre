module SessionsHelper

  def token
    session[:token].to_s
  end
end
