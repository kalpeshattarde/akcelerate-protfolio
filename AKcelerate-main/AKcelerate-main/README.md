# AKcelerate Premium Consulting Website

A professional, modern website for AKcelerate - a premium consulting firm focused on helping companies scale from $1M to $10M+ ARR.

## 🚀 Features

- **Modern Design**: Premium, clean design with a professional aesthetic
- **Responsive Layout**: Fully responsive design that works on all devices
- **Multiple Pages**:
  - Home page with hero, problem/solution sections, stats, and process
  - Case Studies showcasing client transformations
  - Founder bio and credentials
  - Contact page with detailed form
- **Contact Form**: Fully functional contact form with backend API
- **Smooth Animations**: Scroll-based animations and interactions
- **SEO Optimized**: Proper meta tags and semantic HTML

## 📋 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js with Express
- **Styling**: Custom CSS with design system (CSS variables)
- **Font**: Inter (Google Fonts)

## 🛠️ Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment** (optional):
   Edit `.env` file to change port or environment:
   ```
   PORT=3000
   NODE_ENV=development
   ```

## 🎯 Usage

### Start Development Server
```bash
npm run dev
```
This uses nodemon for auto-restart on file changes.

### Start Production Server
```bash
npm start
```

The website will be available at: **http://localhost:3000**

## 📁 Project Structure

```
akcelerate-website/
├── public/                 # Static files
│   ├── index.html         # Home page
│   ├── contact.html       # Contact page
│   ├── case-studies.html  # Case studies page
│   ├── founder.html       # Founder bio page
│   ├── styles.css         # Main stylesheet
│   └── script.js          # Client-side JavaScript
├── server/                # Backend
│   ├── server.js          # Express server
│   └── config.js          # Configuration
├── .env                   # Environment variables
└── package.json           # Dependencies
```

## 🎨 Design System

### Color Palette
- **Primary**: `#0FCCCE` (Cyan)
- **Secondary**: `#000000` (Black)
- **Accent**: Various blues and teals
- **Neutrals**: Grays for text and backgrounds

### Typography
- **Font Family**: Inter (300-900 weights)
- **Headings**: Bold, modern styling
- **Body**: Readable 1.125rem with 1.8 line-height

## 📝 Pages

### 1. Home Page (`/`)
- Hero section with compelling headline
- Problem statement (challenges companies face)
- Solution overview (3-step approach)
- Results/stats showcase
- Process breakdown
- CTA section

### 2. Case Studies (`/case-studies`)
- Detailed client transformation stories
- Metrics and results
- Challenge, solution, and outcome format

### 3. Founder (`/founder`)
- Professional bio
- Experience and credentials
- Personal approach and philosophy

### 4. Contact (`/contact`)
- Comprehensive contact form
- Process overview
- Direct contact information
- FAQ section

## 🔧 API Endpoints

### POST `/api/contact`
Submit contact form data.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "revenue": "1m-3m",
  "challenge": "revenue-plateau",
  "message": "Looking to scale our operations",
  "timeline": "1-month"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Thank you for your inquiry. We will be in touch shortly."
}
```

## 🚀 Deployment

### Production Checklist
1. Update contact information in `server/config.js`
2. Set `NODE_ENV=production` in `.env`
3. Configure email service for contact form submissions
4. Set up proper domain and SSL certificate
5. Deploy to hosting platform (Vercel, Netlify, Heroku, etc.)

### Environment Variables
```
PORT=3000
NODE_ENV=production
```

## 📧 Contact Form Integration

The contact form currently logs submissions to the console. For production:

1. **Email Service**: Integrate with SendGrid, Mailgun, or similar
2. **Database**: Store submissions in MongoDB, PostgreSQL, etc.
3. **CRM**: Connect to HubSpot, Salesforce, or other CRM
4. **Notifications**: Set up Slack/email notifications for new submissions

## 🎯 Customization

### Update Brand Information
Edit `server/config.js`:
```javascript
module.exports = {
    brand: {
        companyName: "YourCompany",
        tagline: "Your Tagline",
        phone: "+1 (555) 123-4567",
        email: "hello@yourcompany.com",
        // ... colors and other settings
    }
};
```

### Modify Colors
Edit CSS variables in `public/styles.css`:
```css
:root {
    --color-cyan: #0FCCCE;
    --color-black: #000000;
    /* ... other colors */
}
```

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is in use, change it in `.env`:
```
PORT=3001
```

### Dependencies Not Installing
Try:
```bash
npm cache clean --force
npm install
```

### Styles Not Loading
Ensure all files are in the correct directories and server is serving static files from `/public`.

## 📄 License

ISC

## 👤 Author

AKcelerate

---

**Status**: ✅ Complete and Ready for Production

All features implemented:
- ✅ HTML pages complete
- ✅ CSS styling complete with full design system
- ✅ JavaScript interactions working
- ✅ Contact form functional
- ✅ Server running successfully
- ✅ All pages tested and verified
