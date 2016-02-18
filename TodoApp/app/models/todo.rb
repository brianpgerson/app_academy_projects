class Todo < ActiveRecord::Base
  validates_presence_of :title, :body
  validates :done, inclusion: {in: [false, true] }
end
