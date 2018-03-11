FROM node:9.3
RUN mkdir /app
WORKDIR /app
COPY yarn.lock package.json .babelrc .env webpack.config.js server.js /app/
COPY src/ /app/src
COPY test/ /app/test
RUN yarn install
EXPOSE 8080
RUN yarn build
RUN yarn start
