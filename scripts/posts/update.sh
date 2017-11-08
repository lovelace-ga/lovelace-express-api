#!/bin/bash

API="http://localhost:4741"
URL_PATH="/update-post"

curl "${API}${URL_PATH}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "post": {
      "_id": "'"${ID}"'",
      "title": "'"${TITLE}"'",
      "content": "'"${CONTENT}"'"
      }
  }'

echo
