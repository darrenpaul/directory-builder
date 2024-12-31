FROM node:20-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]
