# Этап сборки (построение образа сборки)

# базовый образ node + alpine-linux
FROM node:22-alpine as builder

WORKDIR /app

# установить требуемые пакеты для базового образа
RUN apk --no-cache add openssh g++ make python3 git



COPY package.json ./
COPY package-lock.json ./

# установить зависимости
RUN npm ci && npm cache clean --force



# скопировать все файлы
COPY . ./
RUN npm run build



# Конечный образ
FROM node:22-alpine

WORKDIR /app

# скопировать файлы сборки (из образа сборки)
COPY --from=builder /app/.output  ./.output
COPY --from=builder /app/.nuxt  ./.nuxt

# указать хост и порт
ENV HOST 0.0.0.0
EXPOSE 3000



# запустить сборку
ENTRYPOINT ["node", ".output/server/index.mjs"]
