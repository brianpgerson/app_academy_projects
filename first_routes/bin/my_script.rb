require 'addressable/uri'
require 'rest-client'


url = Addressable::URI.new(
  scheme: 'http',
  host: 'localhost',
  port: 3000,
  path: '/contacts/3.json'
).to_s
begin
  puts RestClient.patch(url,
    {contact: {:name => "dogtown@dogs.com" } }
  )
rescue RestClient::Exception
  p "WHOOPS!!"
end
