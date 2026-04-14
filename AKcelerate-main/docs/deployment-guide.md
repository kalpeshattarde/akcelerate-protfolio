# Deployment Guide

## Development

```bash
npm run dev    # Start with nodemon (auto-restart on file changes)
npm start      # Production start
```

Server runs on `http://0.0.0.0:5000`

## Environment Variables

Create `.env` in project root:
```bash
PORT=5000
NODE_ENV=production
```

## Replit Deployment

1. Click **Deploy** in the Replit workspace
2. Select **Reserved VM** or **Autoscale** deployment type
3. Set environment variables in the Secrets panel
4. The site will be available at `https://your-repl-name.replit.app`

## Production Checklist

- [ ] All pages tested in both light and dark mode
- [ ] Contact form tested
- [ ] Mobile responsive on all pages
- [ ] Chart.js charts rendering correctly
- [ ] Nav dropdowns working on mobile
- [ ] WhatsApp float button linked correctly
- [ ] Footer links all work
- [ ] All service pages accessible
- [ ] `NODE_ENV=production` set
- [ ] Custom domain configured (if applicable)

## Adding Custom Domain

In Replit deployment settings:
1. Go to **Custom Domain**
2. Enter your domain
3. Add the provided DNS records to your domain registrar
4. Wait for DNS propagation (up to 48 hours)

## Monitoring

Check server logs in Replit's workflow console.
Set up uptime monitoring with tools like UptimeRobot (free).
