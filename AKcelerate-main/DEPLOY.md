# 🚀 Deploy AKcelerate Website

## Quick Deploy to Vercel (Recommended)

### Step 1: Push to GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name: `akcelerate-website`
   - Visibility: Public or Private
   - Don't initialize with README (we already have code)
   - Click "Create repository"

2. **Push your code:**
   ```bash
   cd akcelerate-website
   git remote add origin https://github.com/YOUR-USERNAME/akcelerate-website.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Click "Sign Up" or "Log In" (use GitHub account)

2. **Import Project:**
   - Click "New Project"
   - Import your `akcelerate-website` repository
   - Click "Import"

3. **Configure:**
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** `npm install`
   - **Output Directory:** Leave default or set to `public`
   - **Install Command:** `npm install`

4. **Environment Variables:**
   - Add if needed:
     ```
     PORT=3000
     ```

5. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your site will be live at `https://your-project-name.vercel.app`

### Step 3: Test

Visit your live URL and verify:
- ✅ Homepage loads
- ✅ Navigation works
- ✅ Founder page displays
- ✅ Case studies page works
- ✅ Contact page functions

---

## Alternative: Deploy to Render

1. **Push to GitHub** (same as above)

2. **Go to Render:**
   - Visit https://render.com
   - Sign up with GitHub

3. **Create Web Service:**
   - Click "New" → "Web Service"
   - Connect repository
   - Configure:
     - **Name:** akcelerate-website
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free

4. **Deploy and test**

---

## ⚡ Super Quick Method (If you already have accounts)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd akcelerate-website
vercel

# Follow prompts, done in 2 minutes!
```

---

## 🎯 Custom Domain (Optional)

Once deployed, you can add a custom domain:

**On Vercel:**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as shown
4. Wait for SSL certificate (automatic)

---

## 📊 Deployment Status

After deployment, you'll have:
- ✅ Live website URL
- ✅ HTTPS enabled automatically
- ✅ Automatic deployments on git push
- ✅ Global CDN for fast loading

---

## 🆘 Troubleshooting

**Build fails?**
- Check that `package.json` is valid
- Verify all dependencies are listed
- Check build logs in Vercel/Render dashboard

**Site not loading?**
- Check if start command is correct: `node server/server.js`
- Verify PORT environment variable
- Check server logs

---

## 💡 Next Steps

After deployment:
1. Share your live URL
2. Test on mobile devices
3. Add custom domain
4. Monitor analytics
5. Update content as needed

**Your website will be live in under 10 minutes!** 🎉
