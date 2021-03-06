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

COPY ./api/package.json .
RUN yarn install
COPY ./api/public/ ./public/
COPY ./api/src/ ./src/
COPY ./api/tsconfig.json .
RUN yarn run compile

ENV PORT=3000

# Copy production-compiled frontend to API
COPY --from=frontend-build /usr/src/app/frontend/dist ./public/
COPY ./.env /usr/src/app/.env

EXPOSE 3000
ENV NODE_ENV production

CMD ["yarn", "start"]
