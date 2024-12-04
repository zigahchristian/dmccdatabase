FROM node:10.13.0-alpine
WORKDIR '/app'
COPY ./package.json ./
RUN npm install 
COPY ./ ./app
CMD [ "npm", "run", "dev" ]   