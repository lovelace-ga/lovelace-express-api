#!/bin/bash

API="http://localhost:4741"
URL_PATH="/sites"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "site": {
      "name": "'"${NAME}"'",
      "blog": [
      {
        "title": "'"${TITLE}"'"
      }
      ]
    }
  }'

echo
