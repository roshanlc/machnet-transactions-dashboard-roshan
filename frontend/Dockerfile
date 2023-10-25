FROM node:18-alpine

WORKDIR /app

COPY package.json .

# Install pnpm first, as it is much faster than npm
RUN npm install -g pnpm

RUN pnpm install

COPY . .

## Provide env values
# ENV VITE_BACKEND_URL http://localhost:9000/api/v1

# RUN npm run build

EXPOSE 9001

# CMD ["npm","run","preview","--port","9001"]

CMD ["pnpm","run","dev"]
