MongoDB

Capped collection to 50 records to stay in the free mongodb range

mongod --config /usr/local/etc/mongod.conf
create .env:
MONGODB_URI=mongodb://localhost:27017/graphql
PORT=443
NODE_ENV=development

curl \
 -X POST \
 -H "Content-Type: application/json" \
 --data '{ "query": "{ userMany { name } }" }' \
 http://localhost:8000
