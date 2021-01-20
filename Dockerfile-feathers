# FRONTEND BUILD STAGE
FROM node:14-alpine AS frontend-build
WORKDIR /usr/src/app/frontend

COPY ./web/package.json ./package.json
RUN yarn install 

COPY ./web .
ENV VUE_APP_API_URL=/v1/
RUN yarn build

# Setup API (and host frontend in it)
FROM node:14-alpine
WORKDIR /usr/src/app/api

COPY ./feathers-api/package.json .
RUN yarn install
COPY ./feathers-api/config/ ./config/
COPY ./feathers-api/public/ ./public/
COPY ./feathers-api/src/ ./src/
COPY ./feathers-api/tsconfig.json .
RUN yarn run compile

ENV API_PORT=3000

# Copy production-compiled frontend to feathers API
COPY --from=frontend-build /usr/src/app/frontend/dist ./public/

EXPOSE 3000
ENV NODE_ENV production

CMD ["node", "lib/"]
