# build only in production
FROM node:22.7.0-alpine

WORKDIR /usr/local/app

COPY package.json .
COPY yarn.lock .

RUN yarn install
COPY . .

RUN npx prisma generate

# # RUN npx prisma migrate dev --name schema

EXPOSE 3000

CMD [ "yarn", "dev" ]