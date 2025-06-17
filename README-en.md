# Delivery Microservices Application

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Project Overview

This project is a delivery service microservices architecture implemented using the NestJS framework. It provides various functionalities including user management, product management, order processing, payment processing, and notification services. This application follows the microservices pattern for scalability, maintainability, and fault isolation.

## Architecture

This application consists of the following microservices:

1. **Gateway Service**: Acts as an API gateway that handles all client requests and routes them to appropriate microservices. It handles JWT-based authentication and provides API endpoints.
2. **User Service**: Responsible for user management and authentication. Provides user registration, login, and profile management features. Uses PostgreSQL database.
3. **Product Service**: Handles product information management. Provides product listing and detailed information retrieval features. Uses PostgreSQL database.
4. **Order Service**: Manages order processing. Provides order creation, order status management, and delivery information management features. Uses MongoDB database.
5. **Payment Service**: Handles payment processing. Provides payment processing and payment status management features. Uses PostgreSQL database.
6. **Notification Service**: Manages notification processing. Handles notifications for events such as order status changes and payment completion. Uses MongoDB database.

### Inter-Service Communication

- **Synchronous Communication**: Direct communication between services is implemented using gRPC protocol. Each service communicates through interfaces defined in proto files.
- **Asynchronous Communication**: Event-driven communication uses AMQP protocol through RabbitMQ. This maintains loose coupling between services.

### Data Storage

- **PostgreSQL**: Used by User, Product, and Payment services for storing relational data.
- **MongoDB**: Used by Order and Notification services for storing document-based data.
- **Redis**: Used for caching and session management.

## Technology Stack

- **Backend Framework**: NestJS (Node.js based)
- **Language**: TypeScript
- **Package Manager**: pnpm v9.1.1
- **Databases**:
    - PostgreSQL v16: Relational data storage
    - MongoDB v8: Document-based data storage
- **Inter-Service Communication**:
    - gRPC: Synchronous inter-service communication
    - RabbitMQ (AMQP): Asynchronous event-driven communication
- **Caching**: Redis
- **Containerization and Orchestration**:
    - Docker, Docker Compose: Local development and testing
    - Kubernetes: Production deployment
    - Helm: Kubernetes resource management
- **Authentication and Security**: JWT (JSON Web Tokens)
- **Testing**: Jest

## Prerequisites

- Node.js (v16 or higher)
- pnpm (v9.1.1 or higher)
- Docker and Docker Compose
- Git

## Installation

1. Clone the repository:

```bash
$ git clone https://github.com/songminkyu/delivery-microservices.git
$ cd delivery-microservice
```

2. Install dependencies:

```bash
$ pnpm install
```

3. Set up environment variables for each service:
    - `apps/gateway/.env`: API gateway configuration (JWT secret, port, etc.)
    - `apps/user/.env`: User service configuration (database connection info, etc.)
    - `apps/product/.env`: Product service configuration (database connection info, etc.)
    - `apps/order/.env`: Order service configuration (database connection info, etc.)
    - `apps/payment/.env`: Payment service configuration (database connection info, etc.)
    - `apps/notification/.env`: Notification service configuration (database connection info, etc.)

Each environment variable file should include the following information:
- Database connection information (host, port, username, password, database name)
- gRPC server configuration (host, port)
- Other service-specific settings

## Running the Application

### Local Development Environment

```bash
# Development mode
$ pnpm run start

# Development mode (watch mode)
$ pnpm run start:dev

# Production mode
$ pnpm run start:prod
```

### Using Docker Compose

Run all services and databases at once:

```bash
$ docker-compose up
```

Run specific services only:

```bash
$ docker-compose up gateway user
```

Run in background:

```bash
$ docker-compose up -d
```

### Service Access

- Gateway API: http://localhost:3000
- Each service communicates through internal gRPC ports.
- Database ports:
    - PostgreSQL (User): 6001
    - PostgreSQL (Product): 6002
    - MongoDB (Order): 6003
    - PostgreSQL (Payment): 6005
    - MongoDB (Notification): 6006

## Testing

```bash
# Unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# Test coverage
$ pnpm run test:cov
```

## API Documentation

API documentation is provided as a Postman collection. You can import the `docs/NestJS Microservice.postman_environment.json` file into Postman to use it.

Main API endpoints:
- Authentication: `/auth/register`, `/auth/login`
- Products: `/product`
- Orders: `/order`
- Payment: `/payment`

## Project Structure

```
delivery/
├── .github/                # GitHub related configurations
├── apps/                   # Microservice applications
│   ├── gateway/            # API Gateway (Port: 3000)
│   │   ├── src/            # Source code
│   │   │   ├── auth/       # Authentication related code
│   │   │   ├── order/      # Order related code
│   │   │   └── product/    # Product related code
│   │   └── Dockerfile      # Docker build configuration
│   ├── user/               # User service
│   │   ├── src/            # Source code
│   │   │   ├── auth/       # Authentication related code
│   │   │   └── user/       # User related code
│   │   └── Dockerfile      # Docker build configuration
│   ├── product/            # Product service
│   │   ├── src/            # Source code
│   │   │   └── product/    # Product related code
│   │   └── Dockerfile      # Docker build configuration
│   ├── order/              # Order service
│   │   ├── src/            # Source code
│   │   │   └── order/      # Order related code
│   │   └── Dockerfile      # Docker build configuration
│   ├── payment/            # Payment service
│   │   ├── src/            # Source code
│   │   │   └── payment/    # Payment related code
│   │   └── Dockerfile      # Docker build configuration
│   └── notification/       # Notification service
│       ├── src/            # Source code
│       │   └── notification/ # Notification related code
│       └── Dockerfile      # Docker build configuration
├── envs/                   # Environment variable templates and samples
├── docs/                   # Documentation
│   ├── auth-login-scripts.md # Authentication and login scripts documentation
│   ├── dockerhub_image_push.txt # Docker Hub image push guide
│   ├── NestJS Microservice.postman_environment.json # Postman environment configuration
│   └── post_order.md       # Order creation related documentation
├── k8s/                    # Kubernetes and Helm related configurations
│   ├── delivery/           # Delivery service Kubernetes configuration
│   ├── efk-delivery/       # EFK stack (Elasticsearch, Fluentd, Kibana) log collection and analysis configuration
│   ├── fluentbit/          # Fluent Bit log collector configuration
│   ├── helm/               # Helm charts
│   ├── infra/              # Infrastructure related configuration
│   └── kubernetes/         # Basic Kubernetes configuration
├── libs/                   # Shared libraries
│   └── common/             # Common modules
│       ├── src/            # Source code
│       │   ├── const/      # Constants
│       │   ├── dto/        # Data Transfer Objects
│       │   ├── grpc/       # gRPC related code
│       │   └── interceptor/ # Interceptors
│       └── tsconfig.lib.json # TypeScript configuration
├── proto/                  # gRPC protocol definitions
│   ├── notification.proto  # Notification service protocol
│   ├── order.proto         # Order service protocol
│   ├── payment.proto       # Payment service protocol
│   ├── product.proto       # Product service protocol
│   └── user.proto          # User service protocol
├── build-and-push-ps.ps1   # PowerShell script (Docker image build and push)
├── build-and-push.sh       # Bash script (Docker image build and push)
├── docker-compose.image-test.yml # Docker Compose image test configuration
├── docker-compose.prod.yml # Docker Compose production configuration
├── docker-compose.yml      # Docker Compose development configuration
├── nest-cli.json           # NestJS CLI configuration
├── package.json            # Project metadata and dependencies
├── pnpm-lock.yaml          # pnpm lock file
├── run-docker-compose.ps1  # PowerShell script (Docker Compose execution)
├── tsconfig.build.json     # TypeScript build configuration
├── tsconfig.json           # TypeScript base configuration
└── webpack.config.js       # Webpack configuration
```

## Kubernetes Deployment

The project includes configuration files for Kubernetes deployment. You can find examples of the following Kubernetes resources in the `k8s/kubernetes` directory:

- Pods
- ReplicaSets
- Deployments
- Namespaces
- ConfigMaps and Secrets
- Liveness Probes and Readiness Probes
- Services (NodePort, ClusterIP)
- Persistent Volumes and Persistent Volume Claims

You can also find Helm chart deployment examples in the `k8s/helm` directory. Actual deployment configurations can be found in the `k8s/delivery` directory, and infrastructure-related configurations are in the `k8s/infra` directory.

## Contributing

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to your forked repository: `git push origin feature/your-feature-name`
5. Create a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).