FROM node:20-alpine
WORKDIR /app
COPY server/package.json ./
RUN npm install --production
COPY server/src/ ./src/
EXPOSE 8003
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 CMD wget -q --spider http://localhost:8003/healthz || exit 1
CMD ["node", "src/index.js"]


