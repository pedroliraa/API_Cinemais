# Usar imagem oficial node
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código da aplicação
COPY . .

# Expõe a porta que a API usa
EXPOSE 3000

# Comando para rodar a API
CMD ["npm", "start"]