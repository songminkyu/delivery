# Delivery Microservices Application

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## 프로젝트 개요

이 프로젝트는 NestJS 프레임워크를 사용하여 구현된 배달 서비스 마이크로서비스 아키텍처입니다. 사용자 관리, 상품 관리, 주문 처리, 결제 처리, 알림 서비스 등 다양한 기능을 제공합니다.

## 아키텍처

이 애플리케이션은 다음과 같은 마이크로서비스로 구성되어 있습니다:

1. **Gateway 서비스**: API 게이트웨이로 모든 클라이언트 요청을 처리하고 적절한 마이크로서비스로 라우팅합니다.
2. **User 서비스**: 사용자 관리 및 인증을 담당합니다. PostgreSQL 데이터베이스를 사용합니다.
3. **Product 서비스**: 상품 정보 관리를 담당합니다. PostgreSQL 데이터베이스를 사용합니다.
4. **Order 서비스**: 주문 처리를 담당합니다. MongoDB 데이터베이스를 사용합니다.
5. **Payment 서비스**: 결제 처리를 담당합니다. PostgreSQL 데이터베이스를 사용합니다.
6. **Notification 서비스**: 알림 처리를 담당합니다. MongoDB 데이터베이스를 사용합니다.

서비스 간 통신은 gRPC 프로토콜을 사용하여 이루어집니다.

## 기술 스택

- **프레임워크**: NestJS
- **언어**: TypeScript
- **패키지 매니저**: pnpm
- **데이터베이스**: PostgreSQL, MongoDB
- **서비스 간 통신**: gRPC
- **메시지 큐**: RabbitMQ (AMQP)
- **캐싱**: Redis
- **컨테이너화**: Docker, Docker Compose
- **인증**: JWT

## 사전 요구사항

- Node.js (v16 이상)
- pnpm (v9.1.1 이상)
- Docker 및 Docker Compose
- Git

## 설치 방법

1. 저장소 클론:

```bash
$ git clone <repository-url>
$ cd delivery
```

2. 의존성 설치:

```bash
$ pnpm install
```

3. 각 서비스의 환경 변수 설정:
   - `apps/gateway/.env`
   - `apps/user/.env`
   - `apps/product/.env`
   - `apps/order/.env`
   - `apps/payment/.env`
   - `apps/notification/.env`

## 실행 방법

### 로컬 개발 환경

```bash
# 개발 모드
$ pnpm run start

# 개발 모드 (변경 감지)
$ pnpm run start:dev

# 프로덕션 모드
$ pnpm run start:prod
```

### Docker Compose 사용

모든 서비스와 데이터베이스를 한 번에 실행:

```bash
$ docker-compose up
```

특정 서비스만 실행:

```bash
$ docker-compose up gateway user
```

백그라운드에서 실행:

```bash
$ docker-compose up -d
```

## 테스트

```bash
# 단위 테스트
$ pnpm run test

# e2e 테스트
$ pnpm run test:e2e

# 테스트 커버리지
$ pnpm run test:cov
```

## API 문서

API 문서는 Postman 컬렉션으로 제공됩니다. `docs/NestJS Microservice.postman_environment.json` 파일을 Postman으로 가져와서 사용할 수 있습니다.

## 프로젝트 구조

```
delivery/
├── apps/                   # 마이크로서비스 애플리케이션
│   ├── gateway/            # API 게이트웨이
│   ├── user/               # 사용자 서비스
│   ├── product/            # 상품 서비스
│   ├── order/              # 주문 서비스
│   ├── payment/            # 결제 서비스
│   └── notification/       # 알림 서비스
├── libs/                   # 공유 라이브러리
│   └── common/             # 공통 모듈
├── proto/                  # gRPC 프로토콜 정의
├── docs/                   # 문서
└── tutorial/               # 튜토리얼 및 예제
```

## 쿠버네티스 배포

프로젝트는 쿠버네티스 배포를 위한 설정 파일을 포함하고 있습니다. `tutorial/kubernetes` 및 `tutorial/helm` 디렉토리에서 관련 설정을 확인할 수 있습니다.

## 라이센스

이 프로젝트는 [MIT 라이센스](LICENSE)를 따릅니다.
