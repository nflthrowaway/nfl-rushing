FROM node:14 as build-stage

WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .

RUN npm run build

FROM nginx:1.17.0-alpine

COPY --from=build-stage /frontend/build /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'