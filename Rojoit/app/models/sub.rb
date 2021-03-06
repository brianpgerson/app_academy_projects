class Sub < ActiveRecord::Base
  validates :title, :description, :user_id, presence: true

  belongs_to :moderator,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: 'User'

  has_many :posts,
    foreign_key: :sub_id,
    primary_key: :id,
    class_name: 'Post'
end
