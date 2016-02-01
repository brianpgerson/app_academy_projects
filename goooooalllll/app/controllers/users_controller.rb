class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      flash[:notice] = ["Logged in, #{@user.username}!"]
      #TODO redirect somwehre
    else
      flash.now[:errors] = @user.errors.full_messages
      @user = User.new(user_params)
      render :new
    end
  end


  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
