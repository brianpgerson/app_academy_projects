class Contact < ActiveRecord::Base
  validates :email, presence: true, uniqueness: true {scope: :user_id}
  vaidates_presence_of :name, :user_id

  belongs_to :owner,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: "User"
    
end
