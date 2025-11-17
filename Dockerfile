FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build



# --- Production Stage ---
FROM node:18-alpine

WORKDIR /app

# Install a lightweight static server
RUN npm install -g serve

# Copy build from previous stage
COPY --from=build /app/build ./build

EXPOSE 3000

# Serve production build
CMD ["serve", "-s", "build", "-l", "3000"]
