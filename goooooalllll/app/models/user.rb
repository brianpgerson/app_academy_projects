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

class User < ActiveRecord::Base
  validates :password, length: {minimum: 6}, allow_nil: true
  validates :session_token, :username, :password_digest, presence: true
  attr_reader :password

  has_many :goals

  after_initialize :ensure_session_token

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(username, password)
    @user = User.find_by_username(username)
    return nil if @user.nil?
    return @user if @user.is_password?(password)
    nil
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    self.session_token
  end



  private
  def user_params
    params.require(:user).permit(:username, :password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end
end
