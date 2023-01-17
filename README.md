This a RestApi project using node.js and javascript from ########## test

# Install necessary package
npm i

# Start server
npm run start

# Curl for api

## get post
curl --request GET \
  --url http://localhost:3000/get-post

## search with postid 
curl --request GET \
  --url 'http://localhost:3000/search?postId=1'

## search with id
curl --request GET \
  --url 'http://localhost:3000/search?id=1'

## search with name
curl --request GET \
  --url 'http://localhost:3000/search?name=labore'

## search with email
curl --request GET \
  --url 'http://localhost:3000/search?email=Eliseo'

## search with body

curl --request GET \
  --url 'http://localhost:3000/search?body=laudantium'