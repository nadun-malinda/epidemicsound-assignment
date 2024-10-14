# Use Node.js 18 image
FROM node:18-bullseye

# Install xvfb and other necessary dependencies for running browsers
RUN apt-get update && apt-get install -y xvfb

# Set working directory
WORKDIR /code

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Install Playwright browsers and dependencies using npx
RUN npx playwright install --with-deps

# Copy the rest of the app files
COPY . .

# Run tests with xvfb to simulate a display environment
CMD ["xvfb-run", "npx", "playwright", "test", "--ui"]

# Expose the necessary port for React
EXPOSE 3000
