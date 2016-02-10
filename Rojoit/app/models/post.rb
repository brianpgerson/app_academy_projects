class Post < ActiveRecord::Base
  validates :title, :author_id, :sub_id, presence: true

  belongs_to :sub,
    foreign_key: :sub_id,
    primary_key: :id,
    class_name: 'Sub'

  belongs_to :author,
    foreign_key: :author_id,
    primary_key: :id,
    class_name: "User"
end
