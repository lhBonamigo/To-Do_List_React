FROM node:18-alpine

# Define um usuário não root para segurança
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Define diretório de trabalho
WORKDIR /app

# Copia apenas arquivos de dependência primeiro para otimizar o cache do Docker
COPY package*.json ./

# Instala dependências sem armazenar arquivos temporários desnecessários
RUN npm install --production

# Copia o restante do código da aplicação
COPY . .

# Define permissões para o usuário não root
RUN chown -R appuser:appgroup /app

# Muda para o usuário não root
USER appuser

# Expõe a porta do container
EXPOSE 3001

# Comando padrão do container
CMD ["npm", "run", "dev"]