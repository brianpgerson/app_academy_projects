class CatRentalRequestsController < ApplicationController

  def new
    @cats = Cat.all
    render :new
  end

  def create
    @cat = Cat.find_by_id(cat_rental_params[:cat_id])
    @cat_request = CatRentalRequest.new(cat_rental_params)
    if @cat_request.save
      redirect_to cat_url(@cat)
    else
      render json: @cat_request.errors.full_messages, status: :unprocessable_entity
    end
  end

  def approve!
    @cat_rental_request = CatRentalRequest.find_by_id(params[:crr_id])
    if @cat_rental_request.approve
      redirect_to cat_url(Cat.find(params[:id]))
    else
      render json: @cat_request.errors.full_messages, status: :unprocessable_entity
    end
  end

  def deny!
    @cat_rental_request = CatRentalRequest.find_by_id(params[:crr_id])
    if @cat_rental_request.deny
      redirect_to cat_url(Cat.find(params[:id]))
    else
      render json: @cat_request.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def cat_rental_params
    params.require(:cat_rental_request).permit(:cat_id, :start_date, :end_date)
  end

end
