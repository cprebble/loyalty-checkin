FROM node:9.3
RUN apt-get update && apt-get install netcat-openbsd -y
RUN mkdir /app
WORKDIR /app
COPY yarn.lock package.json .babelrc .eslintrc .eslintignore .env webpack.config.js index.html /app/
COPY src/ /app/src
COPY test/ /app/test
RUN yarn install
EXPOSE 8080
RUN yarn start
