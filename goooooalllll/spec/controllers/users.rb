require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe 'GET #new' do
    it "renders the new users page" do
      get :new
      expect(response).to be_success
      expect(response).to render_template(:new)
    end
  end

  
end
