# 🚀 Deployment Guide (CI/CD with Jenkins)

This project includes a Next.js frontend and a Django REST Framework backend, both containerized with Docker. CI/CD is handled via Jenkins pipelines.

---

## 🧱 Stack
- **Frontend**: Next.js + Tailwind CSS
- **Backend**: Django + DRF + PostgreSQL
- **CI/CD**: Jenkins + Docker + VPS or AWS

---

## 🐳 Docker Setup

- Each app has its own `Dockerfile`

---

## ⚙️ Environment Variables

- Define all secrets (e.g., `SECRET_KEY`, `DATABASE`...) in `.env` files
- Never hardcode credentials or secret keys in source files
- Inject environment files in Docker and during Jenkins deployment

---

## 🗃 Django Migration Strategy

- Run `makemigrations` locally or in CI and commit the migration files to Git
- During deployment, execute `python manage.py migrate` inside the backend container
- Optionally run `collectstatic` for static asset collection in production

---

## ⚙️ Jenkins CI/CD Pipeline

1. Jenkins pulls from the `master` branch
2. Backend and frontend Docker images are built separately
3. Images are pushed to Docker Hub (or your registry) using credentials stored in Jenkins
4. SSH is used to connect to your production server
5. Jenkins pulls the latest images and:
   - Stops and removes old containers
   - Runs the new containers using `docker run`
   - Executes Django migrations via `docker exec`
6. Both frontend and backend are served on ports (e.g., 3000 and 8000), and NGINX or a reverse proxy handles routing

---

## Optional Improvements

- Add version tagging to Docker images
- Use a separate staging environment before production
- Add monitoring/logging via Docker or external tools (e.g., Prometheus + Grafana)

---
