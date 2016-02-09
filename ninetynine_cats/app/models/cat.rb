class Cat < ActiveRecord::Base
  COLORS = ['white', 'black', 'brown', 'calico', 'orange']

  validates_presence_of :birthdate, :color, :name, :sex, :description
  validates :color, inclusion: { in: COLORS }
  validates :sex, inclusion: { in: ['m', 'f'] } # %w(m f)

  has_many :cat_rental_requests, dependent: :destroy
  #dogs dogs dogs
  private
  def age
    (Date.today - self.birthdate).to_i/365
  end

end
