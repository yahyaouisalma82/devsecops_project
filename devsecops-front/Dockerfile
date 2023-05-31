# Stage 1: Build Angular app
FROM node:14 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod

# Stage 2: Serve Angular app using Nginx
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/spacy_world /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
