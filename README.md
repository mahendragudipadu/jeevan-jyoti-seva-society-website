# Jeevan Jyoti Seva Society Website

Official website for Jeevan Jyoti Seva Society - A nonprofit organization serving communities in India through education, empowerment, and care.

## 🌐 Live Website

- **Production:** https://jeevanjyotisevasociety.org
- **Staging (Netlify):** https://roaring-clafoutis-29585b.netlify.app

## 📋 Overview

This is a responsive, modern website featuring:
- About section with mission and values
- Program descriptions (Education, Women's Empowerment, Elderly Care, Emergency Relief)
- Impact statistics and testimonials
- Photo gallery with lightbox
- Contact forms for donor interest and general inquiries
- Mobile-responsive design
- Accessibility features

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS variables
- **JavaScript** - Vanilla JS for interactivity
- **Git** - Version control
- **GitHub** - Code repository
- **Netlify** - Hosting and automatic deployment

## 🚀 Quick Start

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/mahendragudipadu/jeevan-jyoti-seva-society-website.git
   cd jeevan-jyoti-seva-society-website
   ```

2. Open `index.html` in your browser:
   ```bash
   open index.html
   ```

### Making Changes

1. Edit the files (HTML, CSS, or JavaScript)
2. Test locally by opening `index.html` in your browser
3. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
4. Netlify will automatically deploy your changes in ~30 seconds!

## 📧 Setting Up Email Notifications (Production)

Currently, the contact forms show alerts in the browser. To receive actual email notifications:

### Option 1: Using Netlify Forms (Recommended - FREE)

1. **Update HTML forms** - Add `netlify` attribute:
   ```html
   <form id="donation-form" name="donor-interest" method="POST" netlify>
   ```

2. **Add hidden field:**
   ```html
   <input type="hidden" name="form-name" value="donor-interest">
   ```

3. **Configure Netlify:**
   - Go to Netlify Dashboard → Forms
   - Set up email notifications to: mahendragudipadu@gmail.com

### Option 2: Using Formspree (Easy)

1. Sign up at https://formspree.io
2. Update form action:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option 3: Custom Backend (Advanced)

Create a serverless function or backend API to handle form submissions and send emails.

## 📁 Project Structure

```
jeevan-jyoti-seva-society-website/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── script.js           # JavaScript functionality
├── images/             # Images and graphics
│   ├── Jeevan Jyoti Logo.png
│   ├── hero.png
│   ├── program-*.svg
│   ├── gallery-*.svg
│   └── avatar-*.svg
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🔄 Deployment Workflow

The website uses continuous deployment:

1. **Local Changes** → Edit files on your computer
2. **Git Push** → Push changes to GitHub
3. **Auto Deploy** → Netlify automatically builds and deploys
4. **Live Update** → Website updates in ~30 seconds

## 📝 Common Tasks

### Update Content

- **Edit text:** Open `index.html` and modify the content
- **Change colors:** Edit CSS variables in `styles.css` (lines 9-19)
- **Add/remove sections:** Edit `index.html` structure

### Update Images

1. Add new images to the `images/` folder
2. Update image references in `index.html` or `styles.css`
3. Commit and push changes

### Modify Contact Information

Edit the contact section in `index.html` (around line 600):
```html
<p>+91 12345 67890<br>
US: +1 (555) 123-4567</p>
```

## 🌟 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Fast loading and optimized
- ✅ SEO-friendly semantic HTML
- ✅ Accessibility compliant (ARIA labels, keyboard navigation)
- ✅ Interactive photo gallery
- ✅ Smooth scroll navigation
- ✅ Form validation
- ✅ Free SSL certificate (HTTPS)
- ✅ Global CDN hosting

## 📧 Support

For questions or issues:
- **Email:** mahendragudipadu@gmail.com
- **GitHub Issues:** https://github.com/mahendragudipadu/jeevan-jyoti-seva-society-website/issues

## 📜 License

Copyright © 2025 Jeevan Jyoti Seva Society. All rights reserved.

---

Built with ❤️ for the Jeevan Jyoti Seva Society mission
