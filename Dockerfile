FROM node:24.15.0-slim
WORKDIR /api-petsecure.devsonic.cl
COPY ./entrypoint.sh ./entrypoint.sh
COPY ./dist ./dist
COPY ./.env ./.env
COPY ./prisma ./prisma
COPY ./prisma.config.ts ./prisma.config.ts
COPY ./package.json ./package.json
RUN npm install --omit=dev
RUN apt-get update -y && apt-get install -y openssl ca-certificates
RUN chmod +x ./entrypoint.sh
EXPOSE 3000
CMD ["./entrypoint.sh"]