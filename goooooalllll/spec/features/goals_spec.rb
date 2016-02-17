require 'spec_helper'
require 'rails_helper'

feature "creating a goal" do

  scenario "when logged out" do
    visit goals_url
    click_on "Create Goal"
    expect(page).to have_content "Must be logged in to create a goal"
  end

  feature "when logged in" do

    scenario "takes you to create goal page" do
      sign_in_and_create_goal
      expect(page).to have_content("Create a New Goal")
    end

    scenario "takes you to create goal page" do
      sign_in_and_create_goal
      expect(page).to have_content("Create a New Goal")
    end

    scenario "creates a goal" do
      sign_in_and_create_goal
      fill_in 'title', with: 'Lose Weight'
      fill_in 'description', with: 'In two weeks, lose 50 pounds by only eating popcorn'
      click_on 'Create Goal'
      expect(page).to have_content("Wow, what a noble goal")
    end

    scenario "fails an invalid goal" do
      sign_in_and_create_goal
      fill_in 'description', with: 'In two weeks, lose 50 pounds by only eating popcorn'
      click_on 'Create Goal'
      expect(page).to have_content("Title can't be blank")
    end
  end
end

feature "showing a goal" do
end

feature "editing a goal" do
end

feature "listing out goals" do
end

feature "tracking goal progess" do
end

feature "deleting a goal" do
end
