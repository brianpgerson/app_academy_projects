class Bench < ActiveRecord::Base
  validates :description, :lat, :lng, presence: true

  def self.in_bounds(boundaries)
    benches = Bench.where("lat BETWEEN #{boundaries['southWest']['lat']} AND #{boundaries['northEast']['lat']}")
      .where("lng BETWEEN #{boundaries['southWest']['lng']} AND #{boundaries['northEast']['lng']}")

    benches
  end

end
