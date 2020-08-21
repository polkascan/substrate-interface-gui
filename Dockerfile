### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10-alpine as builder

# Install Python and other dependencies via apk
RUN apk update && apk add python g++ make && rm -rf /var/cache/apk/*

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
ARG SUBSTRATE_API_URL=http://127.0.0.1:8080/rpc/
ENV SUBSTRATE_API_URL=$SUBSTRATE_API_URL

ARG BASE_HREF=/
ENV BASE_HREF=$BASE_HREF

RUN npm run ng build -- --prod --output-path=dist --base-href=${BASE_HREF}


### STAGE 2: Setup ###

FROM nginx:1.14.1-alpine

## Allow for various nginx proxy configuration
ARG NGINX_CONF=nginx/prod.conf
ENV NGINX_CONF=$NGINX_CONF

## Remove default nginx configs
RUN rm -rf /etc/nginx/conf.d/*

## Copy our default nginx config
#COPY nginx/prod.conf /etc/nginx/conf.d/
COPY ${NGINX_CONF} /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
