FROM node:22-alpine

WORKDIR /app

RUN npm install -g expo-cli @expo/ngrok

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8081

CMD ["npx", "expo", "start", "--tunnel", "ngrok"]
