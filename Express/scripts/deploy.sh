#!/bin/bash
set -e
set -o pipefail
set -x

npm run build

scp -r \
package.json \
dist \
jackydemo:~/final-project-express-server/

ssh jackydemo "
source ~/.nvm/nvm.sh && \
cd ~/final-project-express-server/ && \
npm i --omit=dev && \
cp .env dist/ && \
cd dist && \
npx knex migrate:latest && \
pm2 reload express-server && \ 
echo done.
"



## for first time setup, run: pm2 start --name express-server dist/server.js
