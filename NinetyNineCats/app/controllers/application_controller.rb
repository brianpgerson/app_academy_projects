class ApplicationController < ActionController::Base

  helper_method :current_user

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    return nil if session[:session_token].nil?
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def login_user!(user)
    user.reset_session_token!
    flash[:notice] = "Success!"
    session[:session_token] = user.session_token
    redirect_to cats_url
  end

  def redirect_if_logged_in
    redirect_to cats_url unless current_user.nil?
  end
end
