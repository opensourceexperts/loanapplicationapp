# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy the project into the container
COPY . .

# Install dependencies
RUN npm install

# Build the app
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
