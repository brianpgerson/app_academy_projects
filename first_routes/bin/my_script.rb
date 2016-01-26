require 'addressable/uri'
require 'rest-client'


url = Addressable::URI.new(
  scheme: 'http',
  host: 'localhost',
  port: 3000,
  path: '/users/10.json'
).to_s
begin
  puts RestClient.patch(url,
    {user: { username: "idonwannawait" }}
  )
rescue RestClient::Exception
  p "WHOOPS!!"
end
