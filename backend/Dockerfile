# Docker Parent Image with Node based on alpine-Linux
FROM node:12-alpine

# Create a base Directory in the Container
WORKDIR /usr/src/app

# Copy all files to the new Directory
COPY package*.json ./
COPY . .

# Grab dependencies and compile the typescript src
RUN npm install -g typescript
RUN npm install
RUN tsc

# Expose the port outside of the container
EXPOSE 3000

# Start the server
CMD ["npm", "start"]

# BUILD IMAGE FROM Dockerfile
# docker build -t test .
# START CONTAINER FROM IMAGE
# docker run -d -p 5000:5000 test
# ----------------------
# docker container ls -a
# docker container prune
# docker image ls -a
# docker image prune
# ----------------------
# docker exec -it <container id> sh   (or, if available /bin/bash)
