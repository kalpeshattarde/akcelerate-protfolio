# 🌐 Custom Domain Setup Guide

## Transform Your Website from Vercel URL to Your Own Domain

Current: `https://akcelerate-website.vercel.app`
Future: `https://www.akcelerate.com` or `https://akcelerate.in`

---

## Step 1: Choose and Purchase a Domain

### Recommended Domain Registrars (India-friendly):

**1. GoDaddy India** - https://www.godaddy.com/en-in
- Popular and reliable
- Good customer support
- Price: ₹99-999/year

**2. Namecheap** - https://www.namecheap.com
- Affordable pricing
- Free WhoisGuard (privacy)
- Price: $8-15/year

**3. Google Domains** - https://domains.google
- Clean interface
- Integrated with Google services
- Price: $12/year

**4. BigRock** - https://www.bigrock.in
- Indian company
- Local support
- Price: ₹199-699/year

### Domain Suggestions:

- `akcelerate.com` (if available)
- `akcelerate.in` (India-specific)
- `akcelerateindia.com`
- `thinkfastergrowsmarter.com`
- `akconsulting.in`

---

## Step 2: Configure Your Domain on Vercel

### A. Add Domain to Vercel

1. **Go to:** https://vercel.com
2. **Navigate to:** Your akcelerate-website project
3. **Click:** "Settings" → "Domains"
4. **Add your domain:** e.g., `akcelerate.com`
5. **Also add:** `www.akcelerate.com` (recommended)

### B. Vercel Will Show DNS Records

You'll see something like:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## Step 3: Update DNS Settings at Your Registrar

### For GoDaddy:

1. Log in to GoDaddy
2. Go to "My Products" → "Domains"
3. Click "DNS" next to your domain
4. Click "Add Record"

**Add A Record:**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel's IP)
- TTL: `600 seconds`

**Add CNAME Record:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: `1 Hour`

### For Namecheap:

1. Log in to Namecheap
2. Go to "Domain List" → Click "Manage"
3. Go to "Advanced DNS" tab

**Add A Record:**
- Type: `A Record`
- Host: `@`
- Value: `76.76.21.21`
- TTL: `Automatic`

**Add CNAME Record:**
- Type: `CNAME Record`
- Host: `www`
- Value: `cname.vercel-dns.com`
- TTL: `Automatic`

### For Google Domains:

1. Go to DNS settings
2. Add custom resource records:

**A Record:**
```
Name: @
Type: A
TTL: 1H
Data: 76.76.21.21
```

**CNAME Record:**
```
Name: www
Type: CNAME
TTL: 1H
Data: cname.vercel-dns.com
```

---

## Step 4: Wait for DNS Propagation

⏱️ **Time Required:** 5 minutes to 48 hours (usually 1-2 hours)

### Check DNS Propagation:

1. **Go to:** https://dnschecker.org
2. **Enter your domain:** `akcelerate.com`
3. **Check if** DNS records have propagated globally

---

## Step 5: Verify & Configure SSL

### Automatic SSL (Vercel handles this):

✅ Vercel automatically provides FREE SSL certificate from Let's Encrypt
✅ Your site will be `https://` (secure)
✅ Certificate auto-renews every 90 days

### Verify SSL is Active:

1. Visit your new domain
2. Look for 🔒 lock icon in browser
3. Certificate should show "Issued by: Let's Encrypt"

---

## Step 6: Set Up Redirects (Optional)

### Redirect Options:

**Option 1: Redirect non-www to www**
- `akcelerate.com` → `www.akcelerate.com`

**Option 2: Redirect www to non-www**
- `www.akcelerate.com` → `akcelerate.com`

**Configure in Vercel:**
1. Go to Project Settings → Domains
2. Choose your preferred redirect option

---

## 📧 Email Setup (Optional)

Once you have a custom domain, you can set up professional email:

### Options:

**1. Google Workspace (₹125/month per user)**
- `kalpesh@akcelerate.com`
- Professional email
- Gmail interface
- Calendar, Drive included

**2. Zoho Mail (Free for 5 users)**
- `kalpesh@akcelerate.com`
- Basic email
- 5GB storage per user

**3. Forward to Gmail (Free)**
- Set up email forwarding
- `kalpesh@akcelerate.com` → `akceleratehq@gmail.com`

---

## 🎯 Post-Setup Checklist

After your domain is live:

- [ ] Test all pages work on new domain
- [ ] Verify SSL certificate is active (https://)
- [ ] Update Google Analytics with new domain
- [ ] Update social media profiles
- [ ] Update email signatures
- [ ] Submit new domain to Google Search Console
- [ ] Update business cards and marketing materials

---

## 💰 Total Cost Estimate

**Domain Name:** ₹199 - ₹999/year
**Hosting (Vercel):** FREE ✅
**SSL Certificate:** FREE ✅
**Email (optional):** FREE - ₹1,500/year

**Minimum Total:** As low as ₹199/year!

---

## 🆘 Need Help?

If you need help setting up your custom domain:

1. **Purchase your domain** from any registrar
2. **Share the domain name** with me
3. **Give me access** to DNS settings (or follow my instructions)
4. I'll help configure everything!

---

## 🚀 Domain Name Availability Check

Before purchasing, check if your desired domain is available:

- https://www.godaddy.com/domainsearch
- https://www.namecheap.com/domains/
- https://domains.google.com

---

**Ready to get your custom domain? Let me know which domain you want and I'll guide you through the setup!** 🌐
