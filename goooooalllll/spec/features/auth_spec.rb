require 'spec_helper'
require 'rails_helper'

feature "the signup process" do


  it "has a new user page" do
    visit new_user_url
    expect(page).to have_content "Create A New User"
  end


  feature "signing up a user" do
    before :each do
      sign_up
    end

    scenario "shows username on the homepage after signup" do
      expect(page).to have_content "barkly"
    end

  end

end

feature "logging in" do

  scenario "when login info is invalid " do
    visit new_session_url
    fill_in 'password', with: 'barkbarkbark'
    click_on "Sign In"
    expect(page).to have_content "Invalid combination of username and password"
  end

  scenario "shows username on the homepage after login" do
    sign_in
    expect(page).to have_content "barkly"
  end

  scenario "shows Goals header on the homepage" do
    sign_in
    expect(page).to have_content "Goals"
  end

end

feature "logging out" do

  it "begins with logged out state"
    visit goals_url
    expect(page).not_to have_content "barkly"

  it "doesn't show username on the homepage after logout"

end
