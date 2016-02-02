class SessionsController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(*user_params.values)
    if @user
      flash[:notice] = ["Thanks for loggin' in, partner"]
      login!(@user)
      redirect_to user_url(@user)
    else
      @user = User.new(email: user_params[:email])
      flash[:errors] = ["Invalid user entry"]
      render :new
    end
  end

  def show
    @user = User.find_by_id(params[:id])
    render :show
  end

  def destroy
    session[:session_token] = nil
    flash[:notice] = ["See y'all next time."]
    redirect_to subs_url
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
