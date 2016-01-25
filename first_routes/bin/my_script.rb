require 'addressable/uri'
require 'rest-client'


url = Addressable::URI.new(
  scheme: 'http',
  host: 'localhost',
  port: 3000,
  path: '/users.md'
).to_s
begin
  puts RestClient.get(url)
rescue RestClient::Exception
  p "WHOOPS!!"
end
