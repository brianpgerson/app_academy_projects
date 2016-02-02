class CommentsController < ApplicationController

  def index
    comment_source = find_commentable
    render json: comment_source.comments
  end

  def show
    render json: Comment.find(params[:id])
  end

  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: comment
    else
      render comment.error.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy
    render json: comment
  end

  private
  def comment_params
    params.require(:comment).permit(:comment_text, :commentable_id, :commentable_type)
  end

  def find_commentable
    resource, id = request.path.split('/')[1, 2]
    commentable = resource.singularize.classify.constantize.find(id)
  end

end
