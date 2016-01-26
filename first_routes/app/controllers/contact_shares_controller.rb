class ContactSharesController < ApplicationController

  def destroy
    cs = ContactShare.find(contact_shares_params.require(:id))
    cs.destroy
    render json: cs
  end

  def create
    cs = ContactShare.new(contact_shares_params)
    if cs.save
      render json: cs
    else
      render cs.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def contact_shares_params
    params.require(:contact_share).permit(:user_id, :contact_id)
  end

end
