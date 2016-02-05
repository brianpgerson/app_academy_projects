class ContactsController < ApplicationController
  def index
    contacts = Contact.where("contacts.user_id = #{params[:user_id]}")
    .concat(User.find(params[:user_id]).shared_contacts).uniq
    render json: contacts
  end

  def show
    render json: Contact.find(params[:id])
  end

  def update
    contact = Contact.find(params[:id])
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
    contact = Contact.find(params[:id])
    contact.destroy
    render json: contact
  end

  private
  def contact_params
    params.require(:contact).permit(:email, :name, :user_id)
  end

end
