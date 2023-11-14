FROM node:20-slim as build

ARG API_URL
ENV API_URL=${API_URL}

WORKDIR /code

COPY ./client .

RUN npm install
RUN npm run generate

FROM nginx

COPY --from=build /code/.output/public /var/www

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]