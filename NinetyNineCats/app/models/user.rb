require 'bcrypt'

class User < ActiveRecord::Base
  attr_reader :password

  validates :user_name, :password_digest, :session_token, presence: true
  validates :user_name, :session_token, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: true
  after_initialize :ensure_session_token


  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
    self.password_digest
  end

  def is_password?(password)
    pd = BCrypt::Password.new(self.password_digest)
    pd.is_password?(password)
  end

  def self.find_by_credentials(user_name, password)
    user = User.find_by_user_name(user_name)
    return nil if user.nil?
    if user.is_password?(password)
      user
    else
      nil
    end
  end

private
  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end


end
