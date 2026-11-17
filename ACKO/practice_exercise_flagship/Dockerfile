# Production multi-stage Dockerfile for Flagship
FROM node:20-slim AS deps
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev

FROM node:20-slim
WORKDIR /app

# Run as non-privileged user for container security
USER node

COPY --from=deps /app/node_modules ./node_modules
COPY --chown=node:node . .

ENV PORT=7001
EXPOSE 7001

CMD ["node", "src/server.js"]
