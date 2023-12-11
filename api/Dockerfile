# install dependencies
FROM node:lts-alpine AS deps

WORKDIR /app

RUN apk add --update python3 py3-pip
RUN pip3 install transformers

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]
