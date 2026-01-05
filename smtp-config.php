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
define('SMTP_HOST', 'localhost');                    // Use localhost for same-server cPanel email
define('SMTP_PORT', 25);                             // Port 25 for local mail (no SSL needed)
define('SMTP_SECURE', '');                           // No encryption needed for localhost
define('SMTP_USERNAME', 'info@nexofydigital.com');   // Your email address
define('SMTP_PASSWORD', 'InterNet@098');             // cPanel email password

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
