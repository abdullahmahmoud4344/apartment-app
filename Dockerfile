# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port Next.js runs on
EXPOSE 3000

# Set environment to development
ENV NODE_ENV=development

# Ensure Next.js binds to all interfaces (0.0.0.0)
CMD ["npm", "run", "dev"]
