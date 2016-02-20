# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

benches = Bench.create(
  [
    {description: "It's a dirty old bench for weirdos and trash kings.", lat: 37.783488 , lng: -122.409112 },
    {description: "It's a nice bench full of french fries and birds.", lat: 37.791281, lng: -122.438131 },
    {description: "It's a beachside bench with an ocean view.", lat: 37.768888, lng: -122.511425 },
    {description: "It's a very tall bench for adults only.", lat: 37.760407,  lng: -122.447401 },
    {description: "It's a very lonely bench with room to think and breathe.", lat: 37.797458, lng: -122.465706 },
    {description: "It's a strange bench that's always shrouded in a deep mist.", lat: 37.787846, lng: -122.505790},
    {description: "It's a black and orange bench in the finest of locales.", lat: 37.778857, lng: -122.388730}
  ]
)
