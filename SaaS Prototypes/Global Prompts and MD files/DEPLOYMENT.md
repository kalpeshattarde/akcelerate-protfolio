# 🚀 Deployment Guide for VelocityCore Prototypes

This guide covers deploying your enhanced SaaS prototypes to production-ready platforms.

---

## 📋 Pre-Deployment Checklist

- [ ] All dependencies installed: `npm install` in api, web, packages
- [ ] Database schema pushed: `npm run prisma:push`
- [ ] Auth secrets generated: `JWT_SECRET`, database password
- [ ] Environment variables documented and validated
- [ ] Tests passing (if applicable)
- [ ] API endpoints tested locally
- [ ] Frontend connected to backend
- [ ] CORS configured for your domain
- [ ] Backups enabled for database
- [ ] Monitoring/logging configured

---

## 1️⃣ Railway (Recommended for Beginners)

**Why Railway?** Simplest deployment, automatic scaling, great DX.

### Setup
1. Go to [railway.app](https://railway.app) → Sign up
2. Create new project
3. Connect your GitHub repo

### Add Services

**PostgreSQL Database**
- Click "Add → Database" → Select "PostgreSQL"
- Railway creates DB automatically

**Express API**
- Click "Add → Deploy from GitHub"
- Select VelocityCore repo
- Set environment:
  ```
  NODE_ENV=production
  DATABASE_URL=${{Postgres.DATABASE_URL}}
  JWT_SECRET=generate-strong-key-here
  PORT=8000
  CORS_ORIGIN=https://yourdomain.com
  ```

**Environment Variables**
```
# From Railway Dashboard
DATABASE_URL=postgresql://...
JWT_SECRET=super-secret-key
NODE_ENV=production
PORT=8000
CORS_ORIGIN=https://app.yourdomain.com,https://yourdomain.com
LOG_LEVEL=info

# Provider Keys (add as needed)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
TWILIO_ACCOUNT_SID=AC...
```

### Deploy
```bash
# Push to GitHub (Railway watches main branch by default)
git add .
git commit -m "Deploy to production"
git push origin main

# Railway will automatically build and deploy
# Check deployment logs in Railway dashboard
```

### Custom Domain
- In Railway project: Settings → Domains
- Add your domain + DNS CNAME record

---

## 2️⃣ Vercel (For Next.js Frontend)

**Why Vercel?** Made by Next.js creators, seamless Next.js deployment.

### API (Express → Serverless)
⚠️ Express requires adapter for Vercel serverless. Consider **Railway** for API instead.

### Frontend (Next.js)
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import GitHub repo
3. Configure build:
   ```
   Framework: Next.js
   Build Command: npm run build
   Output Directory: .next
   ```

4. Set environment:
   ```
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   API_SECRET=...
   ```

---

## 3️⃣ Fly.io (Great for Scaling)

**Why Fly.io?** Distributed deployment, low latency worldwide.

### Install flyctl
```bash
# macOS
brew install flyctl

# Linux
curl -L https://fly.io/install.sh | sh
```

### Setup App
```bash
# From repo root
fly launch
# Follow prompts:
# - App name: velocitycore-api
# - Region: closest to users
# - Create Postgres database: yes
# - Deploy now: no
```

This creates `fly.toml` config file.

### Configure Database
```bash
# Create PostgreSQL database
fly postgres create --name velocitycore-db

# Attach to app
fly postgres attach velocitycore-db --app velocitycore-api
```

### Set Secrets
```bash
fly secrets set \
  JWT_SECRET="strong-secret-here" \
  NODE_ENV="production" \
  LOG_LEVEL="info" \
  STRIPE_SECRET_KEY="sk_live_..." \
  CORS_ORIGIN="https://yourdomain.com"
```

### Build Docker Image
```bash
# In apps/api directory
cat > Dockerfile << 'EOF'
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies
RUN npm ci --only=production

# Build
COPY . .
RUN npm run build

# Run
EXPOSE 8080
ENV PORT=8080
CMD ["npm", "start"]
EOF
```

### Deploy
```bash
flyctl deploy --app velocitycore-api
```

### Monitor
```bash
flyctl logs --app velocitycore-api
flyctl status --app velocitycore-api
fly open --app velocitycore-api
```

---

## 4️⃣ Docker Compose (Self-Hosted)

**Why Docker Compose?** Full control, works anywhere (VPS, AWS EC2, DigitalOcean).

### Setup VPS
```bash
# On Ubuntu 22.04 server
sudo apt update && sudo apt install -y docker.io docker-compose

# Add user to docker group (optional)
sudo usermod -aG docker $USER
newgrp docker
```

### Create docker-compose.yml
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: velocitycore
      POSTGRES_USER: vcuser
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U vcuser"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  api:
    build: ./apps/api
    ports:
      - "4000:8000"
    environment:
      DATABASE_URL: postgresql://vcuser:${DB_PASSWORD}@postgres:5432/velocitycore
      REDIS_URL: redis://redis:6379
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
      PORT: 8000
      CORS_ORIGIN: https://app.yourdomain.com
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

  web:
    build: ./apps/web
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: https://api.yourdomain.com
    depends_on:
      - api
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

### Deploy
```bash
# Create .env file
cat > .env << 'EOF'
DB_PASSWORD=strong-password-here
JWT_SECRET=strong-secret-here
EOF

# Start services
docker-compose up -d

# Check logs
docker-compose logs -f api

# Run migrations
docker-compose exec api npm run prisma:push

# View running services
docker-compose ps
```

### With Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name app.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
    }
}
```

### Enable HTTPS (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com -d app.yourdomain.com
```

---

## 5️⃣ AWS (For Enterprise)

### RDS PostgreSQL
```bash
# Create RDS database
aws rds create-db-instance \
  --db-instance-identifier velocitycore-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --allocated-storage 20 \
  --master-username admin \
  --master-user-password YOUR_PASSWORD
```

### EC2 + ECS
```bash
# Create EC2 instance, install Docker
# Push Docker image to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin YOUR_ECR_URI

docker tag velocitycore-api:latest YOUR_ECR_URI/velocitycore-api:latest
docker push YOUR_ECR_URI/velocitycore-api:latest

# Deploy via ECS/Lambda
```

---

## 🔄 GitHub Actions CI/CD

Automate deployments on push:

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Tests
        run: npm install && npm run test
      
      - name: Deploy to Railway
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: |
          npm install -g @railway/cli
          railway up --service api --module apps/api
```

---

## 📊 Post-Deployment Checklist

- [ ] API health check: `/health` returns `{ ok: true }`
- [ ] Database connected: Can query users table
- [ ] Auth working: POST `/register` creates user
- [ ] Frontend connects: Can login from web app
- [ ] Emails send: RESEND key working
- [ ] SMS sends: TWILIO key working
- [ ] Webhooks received: Stripe webhooks processing
- [ ] Logs captured: Check production logs
- [ ] Error tracking: Sentry/Datadog connected
- [ ] SSL certificate: HTTPS working
- [ ] Backups enabled: Database backups running
- [ ] Monitoring alerts: Configured for downtime

---

## 🚨 Common Issues & Fixes

### "Connection refused" to database
```bash
# Check DATABASE_URL format
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Verify database exists
createdb velocitycore
```

### "Migration failed"
```bash
# Reset database (⚠️ Deletes data!)
npm run prisma:push --force-reset
```

### "API unreachable from frontend"
```bash
# Check CORS_ORIGIN matches frontend URL
# Update if needed and redeploy
```

### "Out of memory"
```bash
# Increase container memory in deployment config
# Railway: increase machine size
# Fly: scale machine
```

---

## 📈 Scaling Strategy

**Stage 1: MVP (Current)**
- Single server deployment
- Shared database
- Basic monitoring

**Stage 2: Growth (1000+ users)**
- Load balancer
- Multiple API instances
- Redis cache layer
- Database read replicas

**Stage 3: Scale (10000+ users)**
- CDN for static assets
- Message queue (RabbitMQ, Redis)
- Separate analytics database
- Database sharding by org

---

## 📞 Support & Monitoring

### Error Tracking (Sentry)
```bash
npm install @sentry/node

# In app.ts:
import * as Sentry from "@sentry/node";
Sentry.init({ dsn: process.env.SENTRY_DSN });
```

### Uptime Monitoring
- [Pingdom](https://www.pingdom.com) - Check `/health` every 5 min
- [Better Stack](https://betterstack.com) - Logs and uptime in one platform
- [Grafana Cloud](https://grafana.com/cloud) - Metrics and dashboards

### Performance Monitoring
- [New Relic](https://newrelic.com) - APM & insights
- [Datadog](https://www.datadoghq.com) - Comprehensive monitoring

---

## 🎯 Next: Multi-Prototype Deployment

Each prototype can now use this guide with minor customizations:
1. Change app name in deployment
2. Point to correct git branch/folder
3. Configure domain specific to prototype
4. Create separate databases per prototype or share with multi-tenancy

All prototypes share the same VelocityCore API backend!

---

**Choose your deployment platform and start shipping!** 🚀
