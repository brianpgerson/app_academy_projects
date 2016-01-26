class Cat < ActiveRecord::Base
  COLORS = [:white, :black, :brown, :calico, :orange]

  validates_presence_of :cat_tables, :birthdate, :color, :name, :sex, :description
  validates :color, inclusion: { in: COLORS }
  validates :sex, inclusion: { in: [:m, :f] }

  private
  def age
    (Date.today - self.birthdate).to_i/365
  end
end
