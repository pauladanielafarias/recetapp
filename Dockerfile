FROM node:10-alpine
WORKDIR '/'
COPY . .
RUN npm install

EXPOSE $PORT

ENTRYPOINT [ "node", "start" ]