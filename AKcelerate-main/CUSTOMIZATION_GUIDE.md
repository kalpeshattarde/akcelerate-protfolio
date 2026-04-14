# 🎨 Complete Customization Guide for Your AKcelerate Website

## 📁 File Structure Overview

```
akcelerate-website/
├── public/                    # Your website files (HTML, CSS, JS, images)
│   ├── index.html            # Homepage
│   ├── about.html            # About page
│   ├── services.html         # Services page
│   ├── contact.html          # Contact page
│   ├── case-studies.html     # Case studies page
│   ├── css/
│   │   └── styles.css        # All styling
│   ├── js/
│   │   └── main.js           # JavaScript functionality
│   ├── images/               # Images folder
│   │   ├── logo.png
│   │   ├── hero-bg.jpg
│   │   └── ...
│   ├── videos/               # Videos folder (CREATE THIS)
│   ├── documents/            # PDFs/Docs folder (CREATE THIS)
│   └── downloads/            # Downloadable files (CREATE THIS)
└── server/
    └── server.js             # Backend server
```

---

## 📸 How to Add Different Types of Files

### 1. Adding Images

**Step 1:** Place your image in the `public/images/` folder
```
public/images/my-new-photo.jpg
```

**Step 2:** Reference it in HTML
```html
<!-- In any HTML file -->
<img src="images/my-new-photo.jpg" alt="Description">
```

**Example - Adding a team photo to About page:**
```html
<div class="team-section">
    <h2>Our Team</h2>
    <img src="images/team-photo.jpg" alt="Our Amazing Team" class="team-photo">
</div>
```

---

### 2. Adding Videos

**Option A: Upload Video Files**

**Step 1:** Create videos folder
```
public/videos/
```

**Step 2:** Add your video file
```
public/videos/company-intro.mp4
```

**Step 3:** Embed in HTML
```html
<video controls width="100%">
    <source src="videos/company-intro.mp4" type="video/mp4">
    Your browser doesn't support video.
</video>
```

**Option B: Embed YouTube/Vimeo (Recommended for large videos)**
```html
<!-- YouTube -->
<iframe width="560" height="315" 
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
    frameborder="0" allowfullscreen>
</iframe>

<!-- Vimeo -->
<iframe src="https://player.vimeo.com/video/YOUR_VIDEO_ID" 
    width="640" height="360" frameborder="0" allowfullscreen>
</iframe>
```

---

### 3. Adding PDFs and Documents

**Step 1:** Create documents folder
```
public/documents/
```

**Step 2:** Add your PDF
```
public/documents/company-brochure.pdf
public/documents/case-study-1.pdf
```

**Step 3:** Link to it
```html
<!-- Download link -->
<a href="documents/company-brochure.pdf" download>
    📄 Download Our Brochure
</a>

<!-- Open in new tab -->
<a href="documents/case-study-1.pdf" target="_blank">
    📊 View Case Study
</a>

<!-- Embed PDF viewer -->
<iframe src="documents/company-brochure.pdf" 
    width="100%" height="600px">
</iframe>
```

---

### 4. Adding Code Files (for downloads)

**Step 1:** Create downloads folder
```
public/downloads/
```

**Step 2:** Add your code file
```
public/downloads/sample-code.zip
public/downloads/api-documentation.json
```

**Step 3:** Create download link
```html
<a href="downloads/sample-code.zip" download>
    💾 Download Sample Code
</a>
```

---

## 🎨 Website Customization Guide

### 1. Change Text Content

**Edit any HTML file:**
```html
<!-- Before -->
<h1>Welcome to AKcelerate</h1>

<!-- After -->
<h1>Welcome to My Awesome Company</h1>
```

---

### 2. Change Colors

**Edit `public/css/styles.css`:**
```css
/* Change primary color */
:root {
    --primary-color: #2563eb;    /* Change this! */
    --secondary-color: #1e40af;
    --accent-color: #f59e0b;
}

/* Change header background */
header {
    background-color: #your-color;
}

/* Change button colors */
.btn-primary {
    background-color: #your-color;
}
```

---

### 3. Change Fonts

**In `public/css/styles.css`:**
```css
/* Change font family */
body {
    font-family: 'Arial', sans-serif;  /* Change to any font */
}

/* Use Google Fonts */
/* Add to HTML <head>: */
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">

/* Then in CSS: */
body {
    font-family: 'Roboto', sans-serif;
}
```

---

### 4. Add New Pages

**Step 1:** Create new HTML file
```
public/portfolio.html
```

**Step 2:** Copy structure from existing page
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio - AKcelerate</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <!-- Copy navigation from index.html -->
    <header>
        <nav>
            <!-- Navigation links -->
        </nav>
    </header>

    <!-- Your new content -->
    <main>
        <h1>Our Portfolio</h1>
        <!-- Add your content here -->
    </main>

    <!-- Copy footer from index.html -->
    <footer>
        <!-- Footer content -->
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
```

**Step 3:** Add link to navigation (in ALL HTML files)
```html
<nav>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="portfolio.html">Portfolio</a>  <!-- New link -->
    <a href="contact.html">Contact</a>
</nav>
```

---

### 5. Change Logo

**Step 1:** Add your logo to `public/images/`
```
public/images/my-logo.png
```

**Step 2:** Update in all HTML files
```html
<!-- Find this in header: -->
<img src="images/logo.png" alt="Logo">

<!-- Change to: -->
<img src="images/my-logo.png" alt="My Company Logo">
```

---

### 6. Customize Homepage Hero Section

**Edit `public/index.html`:**
```html
<!-- Find hero section -->
<section class="hero">
    <h1>Your Custom Headline</h1>
    <p>Your custom tagline or description</p>
    <a href="contact.html" class="btn-primary">Get Started</a>
</section>
```

**Change background image in `public/css/styles.css`:**
```css
.hero {
    background-image: url('../images/your-hero-image.jpg');
    background-size: cover;
    background-position: center;
}
```

---

## 🚀 How to Deploy Your Changes

### Method 1: Using Git (Automatic Deployment)

```bash
# 1. Navigate to project folder
cd akcelerate-website

# 2. Add all changes
git add .

# 3. Commit with message
git commit -m "Added new images and customized homepage"

# 4. Push to GitHub
git push

# Vercel automatically deploys in ~30 seconds! ✨
```

### Method 2: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Find your project
3. Click "Deployments"
4. Upload changed files manually

---

## 📝 Quick Examples

### Example 1: Add a Team Photo Gallery

```html
<!-- In about.html -->
<section class="team-gallery">
    <h2>Meet Our Team</h2>
    <div class="gallery-grid">
        <img src="images/team-member-1.jpg" alt="John Doe">
        <img src="images/team-member-2.jpg" alt="Jane Smith">
        <img src="images/team-member-3.jpg" alt="Bob Johnson">
    </div>
</section>
```

```css
/* In styles.css */
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.gallery-grid img {
    width: 100%;
    border-radius: 10px;
}
```

---

### Example 2: Add Downloadable Resources Section

```html
<!-- In services.html -->
<section class="resources">
    <h2>Download Our Resources</h2>
    <div class="resource-list">
        <a href="documents/service-brochure.pdf" download class="resource-item">
            📄 Service Brochure (PDF)
        </a>
        <a href="documents/pricing-guide.pdf" download class="resource-item">
            💰 Pricing Guide (PDF)
        </a>
        <a href="documents/case-studies.pdf" download class="resource-item">
            📊 Case Studies (PDF)
        </a>
    </div>
</section>
```

---

### Example 3: Add Video Introduction

```html
<!-- In index.html, below hero section -->
<section class="video-intro">
    <h2>Watch Our Story</h2>
    <div class="video-container">
        <iframe width="100%" height="500" 
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
            frameborder="0" allowfullscreen>
        </iframe>
    </div>
</section>
```

---

## 🎯 Common Customizations

### Change Contact Information

**Edit footer in all HTML files:**
```html
<footer>
    <p>Email: your-email@company.com</p>
    <p>Phone: +1 (555) 123-4567</p>
    <p>Address: 123 Business St, City, State 12345</p>
</footer>
```

### Add Social Media Links

```html
<div class="social-links">
    <a href="https://linkedin.com/company/yourcompany">
        <img src="images/linkedin-icon.png" alt="LinkedIn">
    </a>
    <a href="https://twitter.com/yourcompany">
        <img src="images/twitter-icon.png" alt="Twitter">
    </a>
    <a href="https://facebook.com/yourcompany">
        <img src="images/facebook-icon.png" alt="Facebook">
    </a>
</div>
```

---

## ⚠️ Important Tips

1. **Always backup before major changes** - Commit to Git first
2. **Test locally before deploying** - Run `node server/server.js` and check http://localhost:3000
3. **Optimize images** - Keep under 500KB for fast loading
4. **Use descriptive file names** - `team-photo-2024.jpg` not `IMG_1234.jpg`
5. **Keep folder structure organized** - Don't mix file types

---

## 🆘 Need Help?

If you want to make specific changes and need help, just ask me:
- "Add a photo gallery to the about page"
- "Change the color scheme to blue and white"
- "Add a downloadable PDF section"
- "Embed a YouTube video on the homepage"

I can make the changes for you! 🎨
