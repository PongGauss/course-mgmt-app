# Base on offical Node.js Alpine image
FROM node:16.17-alpine3.15

# Set working directory
WORKDIR /usr/app

# Copy package.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package.json ./

# Install dependencies
RUN yarn install

# Copy all files
COPY ./ ./

# Build app
RUN yarn run build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script with PM2 when container starts
# CMD [ "pm2", "start", "yarn", "--interpreter", "/bin/bash", "--name", "api" ,"--" ,"start" ]
CMD [ "yarn", "run" ,"start" ]