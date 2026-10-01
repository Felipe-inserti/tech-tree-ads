# Ambiente de desenvolvimento: serve a aplicação estática com nginx
FROM nginx:alpine

COPY index.html /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY data /usr/share/nginx/html/data

EXPOSE 80
