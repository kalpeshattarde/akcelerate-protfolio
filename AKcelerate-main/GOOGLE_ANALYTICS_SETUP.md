# 📊 Google Analytics Setup Guide

## How to Add Google Analytics to Your AKcelerate Website

### Step 1: Create Google Analytics Account

1. **Go to:** https://analytics.google.com/
2. **Sign in** with your Google account
3. **Click:** "Start measuring"
4. **Enter Account Details:**
   - Account name: `AKcelerate`
   - Click "Next"

### Step 2: Set Up Property

1. **Property name:** `AKcelerate Website`
2. **Reporting time zone:** `India (GMT+5:30)`
3. **Currency:** `Indian Rupee (₹)`
4. **Click:** "Next"

### Step 3: Business Information

1. **Industry:** `Technology / Professional Services`
2. **Business size:** `Small (1-10 employees)`
3. **How you plan to use Google Analytics:**
   - ☑ Measure advertising ROI
   - ☑ Examine user behavior
   - ☑ Track conversions
4. **Click:** "Create"

### Step 4: Choose Data Stream

1. **Select:** "Web"
2. **Website URL:** `https://akcelerate-website.vercel.app`
3. **Stream name:** `AKcelerate Main Site`
4. **Click:** "Create stream"

### Step 5: Get Your Measurement ID

You'll see a **Measurement ID** like: `G-XXXXXXXXXX`

**Copy this ID** - you'll need it!

### Step 6: Add Analytics to Your Website

**Option A: Using Google Tag (Recommended)**

1. In Google Analytics, click "View tag instructions"
2. Copy the **entire Google tag code**
3. I'll add it to your website - just share the Measurement ID with me!

**Option B: Manual Installation**

Add this code to the `<head>` section of all your HTML files:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Replace `G-XXXXXXXXXX` with your actual Measurement ID!**

---

## 📈 What You'll Be Able to Track

Once installed, you can see:

✅ **Real-time visitors** - Who's on your site right now
✅ **Page views** - Most popular pages
✅ **Traffic sources** - Where visitors come from (Google, social media, direct)
✅ **User demographics** - Age, location, interests
✅ **Conversion tracking** - Form submissions, button clicks
✅ **Device breakdown** - Mobile vs desktop visitors
✅ **User behavior** - How people navigate your site

---

## 🎯 Recommended Events to Track

### 1. Contact Form Submissions
Track when users submit the contact form

### 2. Service Page Views
See which services get the most interest

### 3. WhatsApp Clicks
Track when users click the WhatsApp button

### 4. Email Clicks
Monitor email link clicks

### 5. Downloads
Track PDF/document downloads

---

## 🚀 Next Steps After Setup

1. **Verify Installation:**
   - Go back to Google Analytics
   - Click "Realtime" → "Overview"
   - Visit your website
   - You should see yourself as an active user!

2. **Set Up Goals:**
   - Track contact form submissions
   - Monitor button clicks
   - Measure page engagement

3. **Create Custom Reports:**
   - Services page performance
   - Geographic visitor distribution
   - Conversion funnel analysis

---

## 💡 Pro Tips

- **Allow 24-48 hours** for data to populate fully
- **Check reports weekly** to understand your audience
- **Use insights** to improve your content and services
- **Set up email alerts** for traffic milestones

---

## 🆘 Need Help?

If you need help installing Google Analytics:
1. Share your Measurement ID with me
2. I'll add it to all your pages
3. Deploy and verify it's working!

---

**Ready to add Google Analytics? Let me know your Measurement ID and I'll integrate it!** 📊
