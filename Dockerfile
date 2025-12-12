FROM node:18-alpine

WORKDIR /workspace

# Instala dependências básicas do sistema
RUN apk add --no-cache git

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências do Node
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta
EXPOSE 3333

# Comando para rodar em desenvolvimento
CMD ["npm", "run", "dev"]