FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY *.tgz ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

ENV VITE_BASE_API_URL="https://api-merchant-dev.postpay.vn"

# Copy entrypoint script as /entrypoint.sh
COPY ./entrypoint.sh /entrypoint.sh
# Grant Linux permissions and run entrypoint script
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
