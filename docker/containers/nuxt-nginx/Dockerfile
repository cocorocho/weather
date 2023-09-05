FROM node:20-slim as build

WORKDIR /code

COPY ./client .

RUN npm install
RUN npm run generate

FROM nginx

COPY --from=build /code/.output/public /var/www

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]