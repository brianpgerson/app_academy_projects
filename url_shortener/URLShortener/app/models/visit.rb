# == Schema Information
#
# Table name: visits
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  shortened_url :string           not null
#  created_at    :datetime
#  updated_at    :datetime
#

class Visit < ActiveRecord::Base
  validates :user_id, :presence => true
  validates :shortened_url, :presence => true

  belongs_to :visitor,
    :foreign_key => :user_id,
    :primary_key => :id,
    :class_name => 'User'

  belongs_to :visited_url,
    :foreign_key => :shortened_url,
    :primary_key => :short_url,
    :class_name => 'ShortenedUrl'

  def self.record_visit!(user, shortened_url)
    Visit.create!(user_id: user.id, shortened_url: shortened_url.short_url)
  end

end
