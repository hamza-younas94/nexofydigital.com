# Nexofy Digital - Landing Page

A modern, professional landing page for Nexofy Digital showcasing custom web applications, Android apps, CRM/CMS systems, ePOS solutions, restaurant management, and inventory management services.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Glassmorphism effects, animated gradients, and smooth animations
- **Service Showcase**: Detailed presentation of all services offered
- **Portfolio Section**: Display of past projects and work
- **Working Contact Form**: PHP backend with email functionality and rate limiting
- **Professional Email System**: Supports both basic mail() and SMTP
- **Spam Protection**: Rate limiting (5 requests/hour, 20/day per IP)
- **Domain Restricted**: Contact form only works on nexofydigital.com
- **Fast Performance**: Optimized for speed and SEO
- **Security**: Secure headers, input validation, XSS protection, and sanitization

## 📧 Email Configuration

The contact form is **already working** with basic PHP mail(). For production, set up professional SMTP:

**Quick Start:**
1. ✅ **Basic mail()** (Current) - No setup needed, already working
2. 🚀 **Professional SMTP** (Recommended) - See [EMAIL-SETUP-GUIDE.md](EMAIL-SETUP-GUIDE.md)

Emails are sent to: `projects@nexofydigital.com`

## 📁 Project Structure

```
nexofydigital.com/Modern styling with glassmorphism
├── script.js           # Interactive functionality
├── contact.php         # Contact form backend with rate limiting
├── .htaccess           # Security headers and caching
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
└── README.md           # This file
```

## 🛠️ Technologies Used
glassmorphism, animated gradients, and flexbox/grid
- **JavaScript**: Vanilla JS for interactivity and form handling
- **PHP**: Backend for contact form with email sending and rate limiting
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript**: Vanilla JS for interactivity
- **Google Fonts**: Inter font family

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   cd /Users/hamzayounas/Desktop/nexofydigital.com
   netlify deploy --prod
   ```

3. Follow the prompts and your site will be live!

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd /Users/hamzayounas/Desktop/nexofydigital.com
   vercel --prod
   ```

### Option 3: GitHub Pages

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   cd /Users/hamzayounas/Desktop/nexofydigital.com
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/nexofydigital.com.git
   git push -u origin main
   ```
3. Go to repository Settings > Pages
4. Select "main" branch as source
5. Your site will be live at `https://yourusername.github.io/nexofydigital.com/`

### Option 4: Traditional Web Hosting

1. Upload all files via FTP/SFTP to your web hosting provider
2. Ensure files areSetup

The contact form is **fully functional** with PHP backend! It includes:

✅ Email sending to `projects@nexofydigital.com`  
✅ Rate limiting (5 requests/hour, 20/day per IP)  
✅ Input validation and sanitization  
✅ Spam protection  
✅ Error logging and backup storage

### Requirements

- PHP 7.0 or higher
- Mail function enabled on server (most hosting providers have this)
- Write permissions for rate limiting storage

### Testing Locally

1. Start PHP server:
   ```bash
   cd /Users/hamzayounas/Desktop/nexofydigital.com
   php -S localhost:8000
   ```

2. Visit `http://localhost:8000`

3. Test the contact form

**Note**: Email sending may not work on localhost without configuring a mail server. On production hosting, it will work automatically.

### For Production

Just upload all files to your web hosting. The contact form will work immediately if PHP mail() is enabled (it is on most hosts). },
    body: JSON.stringify(formData)
});
```

## 🎨 Customization

### Update Colors

Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* Add your colors here */
}
```

### Update Content

- **Services**: Edit the services section in `index.html`
- **Portfolio**: Add your actual projects in the portfolio section
- **Contact Info**: Update email, phone, and business hours in the contact section

### Add Your Logo

Replace the text logo with an image:
```html
<div class="logo"> in [index.html](index.html):
```html
<div class="logo">
    <img src="logo.png" alt="Nex

## 📱 Testing

### Local Testing

Simply open `index.html` in your browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (requires npm install -g http-server)
http-server

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### Responsive Testing

Test on different devices using browser DevTools:
- Chrome: F12 > Toggle device toolbar (Ctrl+Shift+M)
- Firefox: F12 > Responsive Design Mode (Ctrl+Shift+M)

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 SEO Optimization

The site includes:
- Semantic HTML5 structure
- Meta descriptions and keywords
- Fast loading times
- Mobile-responsive design

To further improve SEO:
1. Add a `sitemap.xml`
2. Create a `robots.txt`
3. Add Google Analytics
4. Submit to Google Search Console

## 🤝 Support

For questions or support, contact:
- Email: info@nexofydigital.com
- Website: https://nexofydigital.com
projects@nexofydigital.com
- Website: https://nexofydigital.com

## 📝 License

© 2026 Nex Steps

1. ✅ Review and customize content
2. ✅ Add your actual portfolio projects
3. ✅ Set up contact form integration
4. ✅ Add your logo and brand images
5. ✅ Deploy to your hosting provider
6. ✅ Set up custom domain
7. ✅ Add Google Analytics
8. ✅ Submit to search engines

---

**Built with ❤️ by Nekofy Digital**x