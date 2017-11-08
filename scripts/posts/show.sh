#!/bin/sh

API="http://localhost:4741"
URL_PATH="/get-post"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"
  --data '{
    "site": {
      "postID": "'"${ID}"'"
    }
  }'


echo
