class ContactShare < ActiveRecord::Base
  validates :user_id, presence: true, uniqueness: { scope: :contact_id,
    message: "can't have two instances of same contact for one user" }
  validates :contact_id, presence: true

  belongs_to :user,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: "User",
    dependent: :destroy


  belongs_to :contact,
    foreign_key: :contact_id,
    primary_key: :id,
    class_name: "Contact"
end
