# Usamos a imagem oficial do Node (LTS)
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (otimiza o cache)
COPY package*.json ./

# Instala as dependências (dentro do Linux do container)
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta que o Express vai usar (geralmente 3001 ou 3000)
EXPOSE 3001

# Comando para rodar em desenvolvimento
CMD ["npm", "run", "dev"]
