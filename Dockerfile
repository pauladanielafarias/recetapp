FROM node:10-alpine
WORKDIR "/app"
COPY . .
RUN npm install

EXPOSE $PORT

ENTRYPOINT [ "node", "start" ]