class GoalsController < ApplicationController
  before_action :ensure_logged_in, except: [:index]

  def index
    @goals = Goal.all
  end

  def new
    @goal = Goal.new
  end

  def edit
  end

  def destroy
  end

  def create
    @goal = Goal.new(goal_params)
    @goal.user_id = current_user.id
    if @goal.save
      flash[:notice] = "Wow, what a noble goal."
      redirect_to goal_url(@goal)
    else
      flash.now[:errors] = @goal.errors.full_messages
      @goal = Goal.new(goal_params)
      render :new
    end
  end

  def show
    @goal = Goal.find(params[:id])
  end

  def updated
  end

  private
  def goal_params
    params.require(:goal).permit(:title, :description, :progess, :public)
  end

  def ensure_logged_in
    if current_user.nil?
      flash[:notice] = "Must be logged in to create a goal"
      redirect_to goals_url
    end
  end
end
