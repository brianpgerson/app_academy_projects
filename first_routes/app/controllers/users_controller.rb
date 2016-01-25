class UsersController < ApplicationController
  def index
    render json: User.all
  end

  def create
    user = User.new(person_params)
    if user.save
      render json: user
    else
      render(
        json: user.errors.full_messages, status: :unprocessable_entity
      )
    end
  end

  def show
    render json: User.find(params.require(:id))
  end

  def update
    User.update(params[:id], person_params)
    render json: User.find(params.require(:id))
  end

  def destroy
    User.destroy(params[:id])
    render json: User.all
    # render text: "it's deleted"
  end

  private
  def person_params
    params.require(:user).permit(:name, :email)
  end
end
