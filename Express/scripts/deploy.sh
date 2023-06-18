#!/bin/bash
set -e
set -o pipefail
set -x

npm run build

scp -r \
	package.json \
	dist \
	public \
	c25kb:~/express-server/

ssh c25kb "
	source ~/.nvm/nvm.sh && \
	cd ~/express-server/ && \
	npm i --omit=dev && \
	cp .env dist/ && \
	cd dist && \
	npx knex migrate:latest && \
	npx knex seed:run && \
	pm2 reload express-server && \
	echo done.
"

## for first time setup, run: pm2 start --name express-server dist/server.js
