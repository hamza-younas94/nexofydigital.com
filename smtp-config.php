<?php
/**
 * SMTP Configuration File
 * Nexofy Digital - Email Settings
 * 
 * INSTRUCTIONS:
 * 1. Install PHPMailer: composer require phpmailer/phpmailer
 * 2. Update the settings below with your SMTP server details
 * 3. Keep this file secure - do NOT commit to public repositories
 */

// SMTP Server Settings
define('SMTP_HOST', 'smtp.gmail.com');              // Gmail: smtp.gmail.com | Outlook: smtp.office365.com
define('SMTP_PORT', 587);                            // 587 for TLS, 465 for SSL
define('SMTP_SECURE', 'tls');                        // 'tls' or 'ssl'
define('SMTP_USERNAME', 'your-email@gmail.com');     // Your email address
define('SMTP_PASSWORD', 'your-app-password');        // App password (not your regular password)

// Email Settings
define('FROM_EMAIL', 'noreply@nexofydigital.com');   // Sender email
define('FROM_NAME', 'Nexofy Digital');               // Sender name
define('RECIPIENT_EMAIL', 'projects@nexofydigital.com'); // Where to receive form submissions

// For Gmail:
// 1. Enable 2-Step Verification in your Google Account
// 2. Go to: https://myaccount.google.com/apppasswords
// 3. Generate an App Password
// 4. Use that password in SMTP_PASSWORD above

// For Outlook/Office365:
// Use your regular email and password
// Or enable App Passwords if you have 2FA enabled

// Alternative SMTP Providers (Recommended for production):
// - SendGrid: smtp.sendgrid.net (Port 587)
// - Mailgun: smtp.mailgun.org (Port 587)
// - Amazon SES: email-smtp.us-east-1.amazonaws.com (Port 587)
// - SMTP2GO: mail.smtp2go.com (Port 587)

?>
