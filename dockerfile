# Utiliza una imagen ligera de Node.js como base
FROM node:16-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que la aplicación escucha (puerto 5000 en este caso)
EXPOSE 5000

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]