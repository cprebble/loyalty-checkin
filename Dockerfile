FROM node:9.3
RUN mkdir /app
WORKDIR /app
COPY yarn.lock package.json .babelrc .eslintrc .eslintignore .env webpack.config.js /app/
COPY src/ /app/src
COPY test/ /app/test
RUN yarn install
EXPOSE 8080
RUN yarn start
