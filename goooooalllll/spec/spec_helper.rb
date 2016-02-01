
RSpec.configure do |config|
  def sign_in
    visit new_session_url
    fill_in 'password', with: 'barkbarkbark'
    fill_in 'username', with: 'barkly'
    click_on "Sign In"
  end

  def sign_up
    visit new_user_url
    fill_in 'password', with: 'barkbarkbark'
    fill_in 'username', with: 'barkly'
    click_on "Sign Up"
  end


  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end


end
