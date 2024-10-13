# Use Playwright's Node.js image which includes dependencies
FROM mcr.microsoft.com/playwright:v1.48.0-jammy

# Set the working directory inside the container
WORKDIR /code

# Copy the package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm install

# Install Playwright and browser dependencies
RUN npx playwright install --with-deps

# Copy the rest of your client code
COPY . .

# Expose the port Playwright will run on
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
