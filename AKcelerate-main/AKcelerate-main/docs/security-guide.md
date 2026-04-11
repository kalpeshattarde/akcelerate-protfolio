# Security Guide

## Implemented Security Measures

### HTTP Headers (Helmet)
Express uses `helmet` middleware to set secure HTTP headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: no-referrer`
- `Strict-Transport-Security` (on HTTPS)

### Rate Limiting
API endpoints use `express-rate-limit`:
- **API routes** (`/api/*`): 100 requests per 15 minutes per IP

### Input Validation
The contact form validates:
- Name: minimum 2 characters
- Email: valid email format (regex)
- Company: minimum 2 characters
- Message: minimum 20 characters

### Environment Variables
All sensitive values must be in `.env` (gitignored):
```
CONTACT_EMAIL=...
SMTP_USER=...
SMTP_PASS=...
```
Never hardcode API keys or passwords in source files.

### Private Files
The `/private/` directory is in `.gitignore` — use it for:
- Brand asset originals
- Contract templates
- Sensitive business documents

## Security Checklist for Production

- [ ] Set `NODE_ENV=production` in deployment environment
- [ ] Use HTTPS (Replit deployment handles this)
- [ ] Rotate all API keys before going live
- [ ] Enable CSP (Content Security Policy) headers
- [ ] Review CORS origins — restrict to your domain
- [ ] Enable logging for failed requests
- [ ] Set up error monitoring (Sentry recommended)
