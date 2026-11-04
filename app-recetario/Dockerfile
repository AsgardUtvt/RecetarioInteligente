FROM node:22-alpine

WORKDIR /app

RUN npm install -g expo-cli @expo/ngrok

RUN npm install -g expo-cli

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8081

CMD ["npx", "expo", "start", "-c","--tunnel", "ngrok"]

