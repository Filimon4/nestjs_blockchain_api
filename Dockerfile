FROM node:20-alpine AS base
WORKDIR ./app
COPY . .
RUN npm i && npm run build


FROM node:20-alpine
WORKDIR ./app
COPY --from=base /app/dist ./dist
COPY --from=base /app/package*.json ./
RUN npm i --omit=dev
CMD ["node","run","start:prod"]