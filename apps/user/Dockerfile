# 어떤 이미지를 사용 할지
FROM node:alpine AS development

# 작업디렉토리 지정
WORKDIR /usr/src/app

# delivery root에 있는 package.json 복사해오기
COPY package*.json ./

# delivery root에 있는 pnpm-lock.yaml 복사해오기
COPY pnpm-lock.yaml ./

# pnpm 전역 설치
RUN npm i -g pnpm

# Dependency 설치
RUN pnpm i

# 나머지 파일/폴더 복사해오기
COPY . .

CMD ["pnpm", "start:dev", "user"]