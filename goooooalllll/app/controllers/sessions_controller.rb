class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    if @user
      login!(@user)
      flash[:notice]= "Welcome #{@user.username}!! Thanks for logging in!"
      redirect_to goals_url
    else
      flash.now[:errors] = 'Invalid combination of username and password'
      @user = User.new(user_params)
      render :new
    end
  end

  def destroy
    logout!
    redirect_to goals_url
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
