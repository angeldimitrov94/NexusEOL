FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build-prod

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./ssl/nexuseol_com.crt /etc/ssl/certs/nexuseol_com.crt
COPY ./ssl/nexuseol_com.key /etc/ssl/private/nexuseol_com.key
