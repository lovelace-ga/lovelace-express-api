#!/bin/bash

API="http://localhost:4741"
URL_PATH="/deletepost"

curl "${API}${URL_PATH}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "site": {
      "postID": "'"${ID}"'"
    }
  }'
echo
