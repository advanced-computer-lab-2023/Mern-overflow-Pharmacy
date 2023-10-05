# Use the official Node.js image as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy the entire project to the container
COPY . .

# Expose the ports for both backend and frontend
EXPOSE 8000
EXPOSE 3000

# Install server and client dependencies
WORKDIR /app/server
RUN npm install

# Install client dependencies and build the frontend
WORKDIR /app/client
RUN npm install

# Start
WORKDIR /app/server
CMD ["npm", "run", "dev"]