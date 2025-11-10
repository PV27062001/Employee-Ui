# ---- Stage 1: Build the React app ----
FROM node:18-alpine AS build

# Add required build tools for Alpine
RUN apk add --no-cache python3 make g++ bash

WORKDIR /app
COPY package*.json ./

# Clean and install deps
RUN npm ci --legacy-peer-deps

COPY . .

# Run React build
RUN npm run build

# ---- Stage 2: Serve the app with Nginx ----
FROM nginx:1.25-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
