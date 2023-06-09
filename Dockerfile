# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:20.1.0-alpine3.17 as build

# Set the working directory
WORKDIR /usr/local/easyboard

# Add the source code to app
COPY . .

# Install all the dependencies
RUN npm install

# Building app
RUN npm run build

# Use official nginx image as the base image
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/easyboard/dist/easy_board_application /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
