# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'rails_helper'

RSpec.describe User, :type => :model do
  let(:user) {FactoryGirl.build(:user)}
  let(:no_name) {FactoryGirl.build(:no_name)}
  let(:no_pass) {FactoryGirl.create(:no_pass)}
  let(:short_pass) {FactoryGirl.build(:short_pass)}
  context "when no name" do
    it "should require a name" do
      expect(no_name).not_to be_valid
    end
  end

  describe "User" do
    it { should validate_presence_of(:name) }
  end

  context "when password is too short" do
    it "should require that password.length > 6" do
      expect(short_pass).not_to be_valid
    end
  end

  context "awesome user is valid" do
    it "should be valid with a valid name and password" do
      expect(user).to be_valid
    end
  end

end
