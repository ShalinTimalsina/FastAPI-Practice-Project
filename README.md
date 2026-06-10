# Full Stack Application (FastAPI + React + PostgreSQL)

A **DevOps-focused full-stack project** demonstrating real-world practices in **Docker containerization, CI/CD automation, and cloud-ready architecture**.

This project emphasizes **DevOps engineering principles over application development**, focusing on how applications are built, packaged, automated, and prepared for scalable deployment.

---

## Overview

This project simulates a production-ready workflow where a full-stack application is:

- 🐳 Containerized using Docker best practices  
- 🔄 Automated through CI/CD pipelines (GitHub Actions)  
- ⚙️ Configured using environment-based setups  
- ☁️ Designed for cloud-native deployment (AWS-ready)  

---

## Features

-  Multi-container architecture  
-  Docker best practices and optimization  
-  Container orchestration using Docker Compose  
-  CI/CD pipeline design with GitHub Actions  
-  Environment variable management  
-  Cloud deployment readiness  

---

## Docker Best Practices

- Lightweight base images (e.g., slim/alpine)  
- Optimized build layers for caching  
- Separation of services (frontend, backend, database)  
- Environment variables using `.env`  
- Multi-stage builds for frontend  
- Minimal production images  
- Reproducible and consistent environments  

---

## 🔄 CI/CD Pipeline (GitHub Actions)

### Pipeline Steps

1. Checkout code  
2. Install dependencies  
3. Lint and validate  
4. Build Docker images  
5. Run tests (optional)  
6. Prepare deployment  

### Features

- Triggered on push  
- Automated build verification  
- Early error detection  
- Easy integration with AWS deployment  

---

## 📂 Project Structure

project-root/
├── backend/
├── frontend/
├── docker-compose.yml
├── .github/workflows/
├── .env
└── README.md

---

## Running the Application

### Run Using Docker

```bash
docker compose up --build
```

## Services:

**Frontend** → http://localhost:3000
**Backend** → http://localhost:8000
**Database** → PostgreSQL (containerized)

### Stop Containers
``` bash
docker compose down 
```
