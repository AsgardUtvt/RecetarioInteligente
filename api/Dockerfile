# Usa una imagen oficial de Node.js compatible con NestJS
FROM node:22-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalar el CLI de NestJS de forma global
RUN npm install -g @nestjs/cli

# Copiar los archivos de configuración de dependencias (package.json y package-lock.json si existe)
COPY package*.json ./

# Instalar dependencias del proyecto usando la bandera para mitigar errores estrictos de npm v10+
RUN npm install --legacy-peer-deps

# Copiar el resto del código del backend
COPY . .

# Puerto por defecto donde corre la API de NestJS
EXPOSE 3000

# Comando para arrancar en modo desarrollo con recarga automática (Watch Mode)
CMD ["npm", "run", "start:dev"]

