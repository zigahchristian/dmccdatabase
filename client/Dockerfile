FROM node:alpine AS builder
WORKDIR '/app'
COPY ./package.json .
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html 
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]