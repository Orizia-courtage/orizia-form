FROM node:24-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev --ignore-scripts
COPY server.mjs identity.mjs ./
USER node
EXPOSE 3000
CMD ["node", "server.mjs"]
