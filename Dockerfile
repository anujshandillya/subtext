FROM node:22.7.0-alpine

WORKDIR /usr/src/subtext

COPY package.json .
COPY yarn.lock .
COPY ./prisma .

RUN yarn install
# build only in production
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD [ "yarn", "dev" ]