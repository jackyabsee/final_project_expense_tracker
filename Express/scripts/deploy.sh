#!/bin/bash
set -e
set -o pipefail
set -x

npm run build

scp -r \
package.json \
dist \
dt:~/multi/

ssh dt "
source ~/.nvm/nvm.sh && \
cd ~/multi/ && \
npm i --omit=dev && \
cp .env dist/ && \
cd dist && \
npx knex migrate:latest
"



## for first time setup, run: pm2 start --name express-server dist/server.js
