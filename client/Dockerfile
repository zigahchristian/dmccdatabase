FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json .
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html 
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]