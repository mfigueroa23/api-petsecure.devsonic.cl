FROM node:24.15.0-slim
WORKDIR /api-petsecure.devsonic.cl
COPY ./entrypoint.sh ./entrypoint.sh
COPY ./dist ./dist
COPY ./package.json ./package.json
RUN npm install --omit=dev
RUN chmod +x ./entrypoint.sh
EXPOSE 3000
CMD ["./entrypoint.sh"]