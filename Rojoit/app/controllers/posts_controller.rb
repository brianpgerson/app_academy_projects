class PostsController < ApplicationController
  def new
    @post = Post.new
    render :new
  end

  def create
    @post = Post.new(post_params)
    @post.author_id = current_user.id
    @post.sub_id = nil
    if @post.save
      flash[:notice] = ["Post saved!"]
      render :show
    else
      flash[:errors] = ["Problem with saving post, dude"]
      render :new
    end
  end

  def update
    @post = Post.find_by_id(params[:id])
    if @post.update
      flash[:notice] = ["Post updated!"]
      render :show
    else
      flash[:errors] = ["Problem with updating post, dude"]
      render :edit
    end
  end

  def edit
    @post = Post.find_by_id(params[:id])
    render :edit
  end

  def destroy
    @post = Post.find_by_id(params[:id])
    Post.delete(params[:id])
    flash[:notice] = ["Yeah, bro - that post SUCKED! It's GONE."]
    redirect_to sub_url(@post.sub_id)
  end

  def show
    @post = Post.find_by_id(params[:id])
    render :show
  end

  private
  def post_params
    params.require(:post).permit(:title, :url, :content)
  end
end
