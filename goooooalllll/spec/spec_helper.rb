
RSpec.configure do |config|
  def sign_in
    visit new_session_url
    fill_in 'username', with: 'barkley'
    fill_in 'password', with: 'barkley'
    click_on "Sign In"
  end

  def sign_up
    visit new_user_url
    fill_in 'username', with: 'barkley'
    fill_in 'password', with: 'barkley'
    click_on "Sign Up"
  end

  def sign_in_and_create_goal
    sign_up
    click_on "Create Goal"
  end



  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end


end
