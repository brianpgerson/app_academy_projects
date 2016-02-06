class SubsController < ApplicationController
  before_action :is_moderator?, only: [:edit, :update, :destroy]

  def index
    @subs = Sub.all
  end

  def create
    @sub = Sub.new(sub_params)
    @sub.user_id = current_user.id
    if @sub.save
      flash[:notice] = ["Thanks fer creatin' that sub, feller."]
      render :show
    else
      flash[:errors] = ["That sub ain't gone work."]
      render :new
    end
  end

  def show
    @sub = Sub.find_by_id(params[:id])
    #TODO ask about this in code review
    # @posts = Post.all.where(sub_id: @sub.id)
  end

  def update
    @sub = Sub.find_by_id(params[:id])
    if @sub.update
      flash[:notice] = ["Thanks fer updatin' that sub, feller."]
      render :show
    else
      flash[:errors] = ["That sub ain't gone work."]
      render :edit
    end
  end

  def new
    @sub = Sub.new(user_id: current_user.id)
    render :new
  end

  def edit
    @sub = Sub.find_by_id(params[:id])
    render :new
  end

  def destroy
    Sub.delete(params[:id])
    flash[:notice] = ["That sub wasn't that impressive anyways."]
    redirect_to subs_url
  end

  private
  def sub_params
    params.require(:sub).permit(:title, :description)
  end

  def is_moderator?
    @sub = Sub.find_by_id(params[:id])
    @sub.moderator == current_user
  end

end
