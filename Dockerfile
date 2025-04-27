# Use the official Node.js image as a base for building the app
FROM node:20.17.0 AS build

# Set the working directory for building the app
WORKDIR /usr/src/app

# Install Git and SSH client
RUN apt-get update && apt-get install -y git openssh-client && rm -rf /var/lib/apt/lists/*

# Copy package.json and yarn.lock (if using yarn)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the React app code
COPY . .

# Build the React app for production
RUN yarn build

# Use a lightweight Nginx server to serve the static files
FROM nginx:alpine

# Set environment variable for port
ENV PORT=8080

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the build stage to the Nginx HTML directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Add a script to inject environment variables
COPY ./env.template.js /usr/share/nginx/html/env.template.js
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
RUN chmod -R 755 /usr/share/nginx/html

# Expose the port that Nginx will use
EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]