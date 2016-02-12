# == Schema Information
#
# Table name: polls
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Poll < ActiveRecord::Base
  validates :title, presence: true
  validates :author_id, presence: true
  # validates_presence_of :author_id, :id

  belongs_to :poll_author,
    foreign_key: :author_id,
    primary_key: :id,
    class_name: "User"

  has_many :questions,
    foreign_key: :parent_poll_id,
    primary_key: :id,
    class_name: "Question"

end
