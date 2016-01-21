require "byebug"
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

  has_many :visits,
    :foreign_key => :shortened_url,
    :primary_key => :short_url,
    :class_name => 'Visit'

  has_many :visitors,
    :through => :visits,
    :source => :visitor

  has_many :uniq_visitors,
    proc{ distinct },
    :through => :visits,
    :source => :visitor

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

  def num_clicks
    self.visits.count
  end

  def num_uniques
    self.visits.select(:user_id).distinct.where(shortened_url: short_url).count
  end

  def recent_uniques
    self.visits.select(:user_id).distinct.where(shortened_url: short_url).where(created_at: 10.minutes.ago..Time.now)
  end

  def num_deduped_vistors
    self.uniq_visitors.count
  end


end
