from node:slim

workdir /app

copy . .

run npm install

cmd ["npm", "run", "prod"]