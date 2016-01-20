# == Schema Information
#
# Table name: shortened_urls
#
#  id         :integer          not null, primary key
#  short_url  :string           not null
#  long_url   :string           not null
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

require 'SecureRandom'

class ShortenedUrl < ActiveRecord::Base
  validates :short_url, :presence => true, :uniqueness => true
  validates :long_url, :presence => true

  belongs_to :submitter,
    :foreign_key => :user_id,
    :primary_key => :id,
    :class_name => "User"

  def self.random_code
    begin
      short_code = SecureRandom.urlsafe_base64
      raise 'already exists' if ShortenedUrl.exists?(short_code)
    rescue
      retry
    end

    short_code
  end

  def self.create_for_user_and_long_url!(user, long_url)
    short_url = self.random_code
    ShortenedUrl.create!(short_url: short_url, long_url: long_url, user_id: user.id)
  end

end
