# 1. Usar a imagem do Node (mesma versão do seu backend para manter o padrão)
FROM node:20

# 2. Criar o diretório de trabalho
WORKDIR /app

# 3. Copiar apenas os arquivos de dependências primeiro (otimiza o cache)
COPY package*.json ./

# 4. Instalar as dependências
RUN npm install

# 5. Copiar o restante dos arquivos do projeto
COPY . .

# 6. Expor a porta padrão do Vite
EXPOSE 5173

# 7. Comando para rodar o Vite e permitir conexões externas
# O '--host' é obrigatório para o Docker conseguir acessar o servidor do Vite
CMD ["npm", "run", "dev", "--", "--host"]
