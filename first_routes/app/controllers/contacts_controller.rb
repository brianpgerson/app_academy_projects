class ContactsController < ApplicationController
  def index
    render json: Contact.all
  end

  def show
    render json: Contact.find(contact_params)
  end

  def update
    contact = Contact.find(params.require(:id))
    if contact.update(contact_params)
      render json: contact
    else
      render json: contact.errors.full_messages, status: :unprocessable_entity
    end
  end

  def create
    contact = Contact.new(contact_params)
    if contact.save
      render json: contact
    else
      render contact.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    contact = Contact.find(params.require(:id))
    contact.destroy
    render json: contact
  end

  private
  def contact_params
    params.require(:contact).permit(:email, :name, :user_id, :id)
  end

end
