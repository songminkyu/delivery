# 어떤 이미지를 사용할지
FROM node:alpine AS development

WORKDIR /usr/src/app

# package.json 복사해오기
COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

# PNPM 설치하기
RUN npm i -g pnpm

# Dependency 설치하기
RUN pnpm i

# 나머지 파일/폴더 복사해오기
COPY apps/order apps/order
COPY libs libs

RUN pnpm build order

# 커맨드 실행
CMD ["pnpm", "start:dev", "order"]