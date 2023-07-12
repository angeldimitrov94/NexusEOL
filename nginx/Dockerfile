FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./ssl/nexuseol.crt /etc/ssl/certs/nexuseol.crt
COPY ./ssl/nexuseol.key /etc/ssl/private/nexuseol.key
COPY ./dist/ /etc/dist/