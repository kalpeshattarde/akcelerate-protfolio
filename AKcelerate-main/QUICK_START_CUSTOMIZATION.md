# 🚀 Quick Start: Customizing Your Website

## ✅ What's Already Done

Your website is now organized with proper folder structure:

```
public/
├── css/          ← Stylesheets
├── js/           ← JavaScript files
├── images/       ← Photos, logos, icons
├── videos/       ← Video files
├── documents/    ← PDFs, docs
├── downloads/    ← Downloadable files
└── *.html        ← Your web pages
```

---

## 🎯 5-Minute Customizations

### 1️⃣ Add Your Logo

**Step 1:** Save your logo as `public/images/logo.png`

**Step 2:** Add to homepage (`index.html`):
```html
<!-- Add after opening <header> tag -->
<img src="images/logo.png" alt="Company Logo" class="logo">
```

**Step 3:** Style it in `css/styles.css`:
```css
.logo {
    height: 50px;
    width: auto;
}
```

---

### 2️⃣ Add a PDF Brochure

**Step 1:** Copy your PDF to `public/documents/brochure.pdf`

**Step 2:** Add download link in `resources.html`:
```html
<a href="documents/brochure.pdf" download class="btn-primary">
    📄 Download Our Brochure
</a>
```

**Done!** It's instantly downloadable.

---

### 3️⃣ Embed a YouTube Video

**Step 1:** Get YouTube video ID (from URL: youtube.com/watch?v=**VIDEO_ID**)

**Step 2:** Add to any page:
```html
<div class="video-container">
    <h2>Watch Our Story</h2>
    <iframe width="100%" height="500" 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        frameborder="0" allowfullscreen>
    </iframe>
</div>
```

---

### 4️⃣ Change Colors

Edit `public/css/styles.css` - find and change these:

```css
/* Primary color (buttons, links) */
--primary-color: #667eea;    /* Change this hex code */

/* Change header background */
.header {
    background: #your-color;
}

/* Change button color */
.btn-primary {
    background: #your-color;
}
```

**Color picker tool:** https://htmlcolorcodes.com/

---

### 5️⃣ Update Your Contact Info

Edit the footer in ALL .html files:

```html
<div class="footer-contact">
    <h4>Contact Us</h4>
    <p>Email: your-email@company.com</p>
    <p>Phone: +1 (555) 123-4567</p>
    <p>Address: Your Address Here</p>
</div>
```

---

## 🎨 Real Examples You Can Copy-Paste

### Example 1: Photo Gallery

```html
<!-- Add to about.html or any page -->
<section class="gallery">
    <h2>Our Team</h2>
    <div class="photo-grid">
        <img src="images/team-1.jpg" alt="Team Member 1">
        <img src="images/team-2.jpg" alt="Team Member 2">
        <img src="images/team-3.jpg" alt="Team Member 3">
        <img src="images/team-4.jpg" alt="Team Member 4">
    </div>
</section>
```

Add this CSS:
```css
.photo-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.photo-grid img {
    width: 100%;
    border-radius: 10px;
    transition: transform 0.3s;
}

.photo-grid img:hover {
    transform: scale(1.05);
}
```

---

### Example 2: Downloadable Resources List

```html
<section class="downloads">
    <h2>Free Downloads</h2>
    <ul class="download-list">
        <li>
            <a href="documents/guide.pdf" download>
                📊 Business Growth Guide (PDF)
            </a>
        </li>
        <li>
            <a href="documents/template.docx" download>
                📝 Strategy Template (DOCX)
            </a>
        </li>
        <li>
            <a href="downloads/tools.zip" download>
                🛠️ Business Tools Pack (ZIP)
            </a>
        </li>
    </ul>
</section>
```

---

### Example 3: Video Showcase

```html
<section class="videos">
    <h2>Client Success Stories</h2>
    <div class="video-grid">
        <!-- Local video file -->
        <div class="video-item">
            <h3>Case Study: Tech Startup</h3>
            <video controls width="100%">
                <source src="videos/case-study-1.mp4" type="video/mp4">
            </video>
        </div>
        
        <!-- YouTube embed -->
        <div class="video-item">
            <h3>Founder Interview</h3>
            <iframe width="100%" height="315" 
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID">
            </iframe>
        </div>
    </div>
</section>
```

---

## 📤 Deploy Your Changes

After making ANY changes:

```bash
# 1. Go to project folder
cd akcelerate-website

# 2. Add all changes
git add .

# 3. Commit with message
git commit -m "Added logo and updated colors"

# 4. Push to GitHub (auto-deploys!)
git push
```

**Wait 30-60 seconds** → Your changes are LIVE! ✨

---

## 🆘 Common Tasks

### Change Homepage Title
File: `index.html`
```html
<title>Your New Title | Company Name</title>
<h1>Your New Headline</h1>
```

### Add Social Media Links
```html
<div class="social-links">
    <a href="https://linkedin.com/company/yourcompany">LinkedIn</a>
    <a href="https://twitter.com/yourcompany">Twitter</a>
    <a href="https://facebook.com/yourcompany">Facebook</a>
</div>
```

### Change Font
In `css/styles.css`:
```css
body {
    font-family: 'Arial', sans-serif;  /* Any font name */
}
```

### Add Google Analytics
Before `</head>` tag in all HTML files:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 💡 Pro Tips

1. **Always test locally first:**
   ```bash
   cd akcelerate-website
   node server/server.js
   # Visit http://localhost:3000
   ```

2. **Optimize images before uploading:**
   - Use tools like TinyPNG.com
   - Keep under 500KB per image
   - Use .jpg for photos, .png for logos

3. **Backup before major changes:**
   ```bash
   git commit -m "Backup before customization"
   ```

4. **Check on mobile:**
   - Your site is responsive
   - Test on phone after deploying

---

## 🎯 Your New Resources Page

Visit: **https://akcelerate-website.vercel.app/resources.html**

This page shows examples of:
- ✓ Downloadable documents
- ✓ PDF links
- ✓ Video embeds
- ✓ Image galleries
- ✓ Code examples

Use it as a template for adding your own content!

---

## 📞 Need Help?

Just ask me:
- "Add a photo gallery to the about page"
- "Change the color scheme to green"
- "Add a YouTube video to homepage"
- "Create a pricing page"

I'll make the changes for you! 🚀
