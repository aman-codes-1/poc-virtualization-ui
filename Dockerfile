FROM node:14-slim

# Create app directory in container
RUN mkdir -p /ui/

# Set /app directory as default working directory
WORKDIR /ui

# Copy all file from current dir to /app in container
COPY . /ui/

# Install app dependencies
RUN npm install

ENV REACT_APP_GRAPHQL_URI=http://0.0.0.0:9001/graphql
ENV REACT_APP_SUBSCRIPTION_URI=ws://0.0.0.0:9001/graphql

# Exposing Port
EXPOSE 3000

CMD [ "npm", "start" ]
