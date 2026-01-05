# 📧 SMTP Email Configuration Guide

## Quick Setup Options

### Option 1: Basic PHP mail() (Current Default)
✅ **Already configured and working**
- No additional setup required
- Email sent to: `projects@nexofydigital.com`
- Uses server's mail() function
- Works on most shared hosting

### Option 2: Professional SMTP (Recommended for Production)

#### Step 1: Install PHPMailer
```bash
cd /Users/hamzayounas/Desktop/nexofydigital.com
composer require phpmailer/phpmailer
```

#### Step 2: Configure SMTP Settings
Edit `smtp-config.php` with your email provider details:

##### For Gmail:
```php
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_SECURE', 'tls');
define('SMTP_USERNAME', 'your-email@gmail.com');
define('SMTP_PASSWORD', 'your-16-digit-app-password');
```

**Get Gmail App Password:**
1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Select "Mail" and "Mac" or "Other"
4. Copy the 16-digit password

##### For Outlook/Office365:
```php
define('SMTP_HOST', 'smtp.office365.com');
define('SMTP_PORT', 587);
define('SMTP_SECURE', 'tls');
define('SMTP_USERNAME', 'your-email@outlook.com');
define('SMTP_PASSWORD', 'your-password');
```

##### For Professional Email Services:

**SendGrid** (Recommended - 100 free emails/day)
```php
define('SMTP_HOST', 'smtp.sendgrid.net');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'apikey');
define('SMTP_PASSWORD', 'your-sendgrid-api-key');
```
Setup: https://sendgrid.com

**Mailgun** (Recommended - 5,000 free emails/month)
```php
define('SMTP_HOST', 'smtp.mailgun.org');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'postmaster@your-domain.mailgun.org');
define('SMTP_PASSWORD', 'your-mailgun-smtp-password');
```
Setup: https://mailgun.com

**Amazon SES** (Most reliable for high volume)
```php
define('SMTP_HOST', 'email-smtp.us-east-1.amazonaws.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'your-ses-smtp-username');
define('SMTP_PASSWORD', 'your-ses-smtp-password');
```
Setup: https://aws.amazon.com/ses

#### Step 3: Enable SMTP in contact.php
Open `contact.php` and change:
```php
define('USE_SMTP', true); // Change from false to true
```

Uncomment this line:
```php
require_once __DIR__ . '/smtp-config.php';
```

## Testing Your Email Setup

### Test Basic mail() (Current Setup):
1. Open your website
2. Fill out the contact form
3. Check `projects@nexofydigital.com` inbox
4. If no email: check `contact_submissions.log` file

### Test SMTP Setup:
```php
// Create test-email.php
<?php
require 'vendor/autoload.php';
require 'smtp-config.php';

use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USERNAME;
    $mail->Password = SMTP_PASSWORD;
    $mail->SMTPSecure = SMTP_SECURE;
    $mail->Port = SMTP_PORT;
    
    $mail->setFrom(FROM_EMAIL, FROM_NAME);
    $mail->addAddress('projects@nexofydigital.com');
    $mail->Subject = 'SMTP Test - Nexofy Digital';
    $mail->Body = 'SMTP is working correctly!';
    
    $mail->send();
    echo '✅ Email sent successfully!';
} catch (Exception $e) {
    echo '❌ Error: ' . $mail->ErrorInfo;
}
?>
```

Run: `php test-email.php`

## Security Checklist

✅ **Already Implemented:**
- Rate limiting (5 requests/hour, 20/day per IP)
- Spam detection and input validation
- Domain restriction (nexofydigital.com only)
- XSS protection
- Backup logging to file

⚠️ **Important:**
- Never commit `smtp-config.php` to public repositories
- Keep `rate_limit.json` writable but protected (.htaccess configured)
- Use App Passwords, never regular passwords
- Consider using environment variables for production

## Troubleshooting

### Email not received?
1. Check spam/junk folder
2. Verify `contact_submissions.log` file exists with entries
3. Check server mail logs: `/var/log/mail.log`
4. Test with different email address

### SMTP Authentication Failed?
- Double-check credentials in `smtp-config.php`
- Verify App Password (not regular password)
- Check firewall allows outbound port 587/465
- Try different SMTP port (587 vs 465)

### Rate Limit Errors?
- Check `rate_limit.json` permissions (must be writable)
- Adjust limits in `contact.php`:
  ```php
  define('MAX_REQUESTS_PER_HOUR', 10); // Increase if needed
  define('MAX_REQUESTS_PER_DAY', 50);
  ```

## Current Configuration

📧 **Recipient:** projects@nexofydigital.com
🔒 **Security:** Domain restricted + Rate limited
💾 **Backup:** contact_submissions.log
⚡ **Method:** PHP mail() (change to SMTP for production)

## Recommendations for Production

1. **Use Professional SMTP** (SendGrid/Mailgun/SES)
   - Better deliverability
   - Detailed analytics
   - Higher sending limits
   - Better reputation management

2. **Set up SPF/DKIM Records**
   - Improves email deliverability
   - Prevents emails going to spam
   - Your hosting provider can help

3. **Monitor Email Delivery**
   - Check `contact_submissions.log` regularly
   - Set up email alerts for failed submissions
   - Use SMTP service dashboards

## Need Help?

- Contact form working? Test it at: http://localhost:8000/#contact
- SMTP issues? Check PHPMailer docs: https://github.com/PHPMailer/PHPMailer
- Email deliverability? Use mail-tester.com to check your setup

---

**Your contact form is currently working with basic PHP mail().**  
**For production, follow Option 2 above to set up professional SMTP.**
