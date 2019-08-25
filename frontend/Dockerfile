FROM nginx:alpine

# Update the nginx config file
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Add all html, js, css and image files
COPY . /usr/share/nginx/html/
