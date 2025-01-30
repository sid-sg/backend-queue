# Queue System Installation Guide

## Prerequisites
Ensure you have the following installed on your system:
- [Docker](https://docs.docker.com/get-docker/)
- [Node.js & npm](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads) for cloning the repository

---

## 1. Redis Setup
Start a Redis container using Docker:

```sh
docker run --name my_redis -d -p 6379:6379 redis
```

---

## 2. Main Backend Setup

```sh
# Navigate to main backend directory
cd main-backend

# Install dependencies
npm install

# Run unit tests
npm test

# Start the server
npm run start
```

---

## 3. Worker Setup

```sh
# Navigate to worker directory
cd workers

# Install dependencies
npm install

# Start the worker
npm run start
```

---

## 4. Prometheus Setup

```sh
# Start Prometheus with host access
docker run -p 9090:9090 \
  -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml \
  --add-host=host.docker.internal:host-gateway \
  prom/prometheus
```

---

## 5. Grafana Setup

```sh
# Start Grafana container
docker run -d -p 3001:3000 \
  --add-host=host.docker.internal:host-gateway \
  --name=grafana \
  grafana/grafana:latest
```

---

## 6. Grafana Configuration

- Access Grafana dashboard at: [http://localhost:3001](http://localhost:3001)
- Login with default credentials:
  - **Username:** `admin`
  - **Password:** `admin`
- Configure Prometheus as a data source:
  1. Navigate to **Configuration → Data Sources**
  2. Click **Add new data source**
  3. Select **Prometheus**
  4. Set URL to: `http://host.docker.internal:9090`
  5. Click **Save & Test**

---
