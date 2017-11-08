#!/bin/bash

API="http://localhost:4741"
URL_PATH="/update-page"

curl "${API}${URL_PATH}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "page": {
      "_id": "'"${ID}"'",
      "title": "'"${TITLE}"'",
      "content": "'"${CONTENT}"'"
      }
  }'

echo
