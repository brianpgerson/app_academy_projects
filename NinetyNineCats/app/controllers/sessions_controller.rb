class SessionsController < ApplicationController
  before_action :redirect_if_logged_in, only: [:new, :create]

  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(session_params[:user_name], session_params[:password])
    if @user
      login_user!(@user)
    else
      flash.now[:errors] = ["Sorry, invalid login info"]
      render :new
    end
  end

  def destroy
    unless current_user.nil?
      current_user.reset_session_token!
      session[:session_token] = nil
      flash[:notice] = "Successfully Signed Out!"
      redirect_to cats_url
    end
  end

  private
  def session_params
    params.require(:user).permit(:user_name, :password)
  end

end
