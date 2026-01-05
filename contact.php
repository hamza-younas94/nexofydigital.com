<?php
/**
 * Contact Form Handler with Rate Limiting
 * Nexofy Digital - https://nexofydigital.com
 */

// Security headers
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// CORS - Allow only your domain (update this to your actual domain)
$allowed_origins = ['https://nexofydigital.com', 'https://www.nexofydigital.com'];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} elseif (isset($_SERVER['HTTP_HOST']) && 
          (strpos($_SERVER['HTTP_HOST'], 'nexofydigital.com') !== false ||
           $_SERVER['HTTP_HOST'] === 'localhost:8000' ||
           strpos($_SERVER['HTTP_HOST'], 'localhost') !== false)) {
    // Allow requests from the same domain or localhost for testing
    header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*'));
} else {
    // Block requests from other domains
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Access denied from this domain']);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Load Composer autoloader for PHPMailer
require_once __DIR__ . '/vendor/autoload.php';

// Load SMTP configuration
require_once __DIR__ . '/smtp-config.php';

// Configuration
define('RECIPIENT_EMAIL', 'projects@nexofydigital.com');
define('RATE_LIMIT_FILE', __DIR__ . '/rate_limit.json');
define('MAX_REQUESTS_PER_HOUR', 5);
define('MAX_REQUESTS_PER_DAY', 20);
define('USE_SMTP', true); // Set to false to use basic PHP mail() instead

/**
 * Rate limiting function
 */
function checkRateLimit($ip) {
    $data = [];
    
    // Load existing rate limit data
    if (file_exists(RATE_LIMIT_FILE)) {
        $content = file_get_contents(RATE_LIMIT_FILE);
        $data = json_decode($content, true) ?? [];
    }
    
    // Clean up old entries (older than 24 hours)
    $data = array_filter($data, function($entry) {
        return ($entry['last_request'] ?? 0) > (time() - 86400);
    });
    
    // Get current IP data
    $ipData = $data[$ip] ?? ['count_hour' => 0, 'count_day' => 0, 'last_request' => 0, 'hour_start' => time()];
    
    // Reset hourly counter if an hour has passed
    if (time() - ($ipData['hour_start'] ?? 0) > 3600) {
        $ipData['count_hour'] = 0;
        $ipData['hour_start'] = time();
    }
    
    // Check limits
    if ($ipData['count_hour'] >= MAX_REQUESTS_PER_HOUR) {
        return ['allowed' => false, 'message' => 'Rate limit exceeded. Please try again in an hour.'];
    }
    
    if ($ipData['count_day'] >= MAX_REQUESTS_PER_DAY) {
        return ['allowed' => false, 'message' => 'Daily limit exceeded. Please try again tomorrow.'];
    }
    
    // Update counters
    $ipData['count_hour']++;
    $ipData['count_day']++;
    $ipData['last_request'] = time();
    $data[$ip] = $ipData;
    
    // Save updated data
    file_put_contents(RATE_LIMIT_FILE, json_encode($data, JSON_PRETTY_PRINT));
    
    return ['allowed' => true];
}

/**
 * Validate and sanitize input
 */
function validateInput($data) {
    $errors = [];
    
    // Validate name
    if (empty($data['name']) || strlen($data['name']) < 2) {
        $errors[] = 'Name must be at least 2 characters long';
    }
    
    // Validate email
    if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Valid email address is required';
    }
    
    // Validate service
    $valid_services = ['web-app', 'android-app', 'crm-cms', 'epos', 'restaurant', 'inventory', 'other'];
    if (empty($data['service']) || !in_array($data['service'], $valid_services)) {
        $errors[] = 'Please select a valid service';
    }
    
    // Validate message
    if (empty($data['message']) || strlen($data['message']) < 10) {
        $errors[] = 'Message must be at least 10 characters long';
    }
    
    // Check for spam patterns
    $spam_patterns = ['http://', 'https://', 'www.', '<a ', '<script', 'onclick', 'javascript:'];
    foreach ($spam_patterns as $pattern) {
        if (stripos($data['message'], $pattern) !== false || stripos($data['name'], $pattern) !== false) {
            $errors[] = 'Suspicious content detected';
            break;
        }
    }
    
    return $errors;
}

/**
 * Send email using SMTP (PHPMailer)
 */
function sendEmailSMTP($data) {
    // Check if PHPMailer is available
    if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        throw new Exception('PHPMailer not found. Install it using: composer require phpmailer/phpmailer');
    }
    
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USERNAME;
        $mail->Password   = SMTP_PASSWORD;
        $mail->Port       = SMTP_PORT;
        
        // Handle empty SMTP_SECURE for localhost port 25
        if (SMTP_SECURE !== '') {
            $mail->SMTPSecure = SMTP_SECURE;
        } else {
            $mail->SMTPAutoTLS = false; // Disable auto TLS for localhost
        }
        
        // Debugging (disable in production)
        // $mail->SMTPDebug = 2; // Enable for troubleshooting
        
        // Timeout settings for slow connections
        $mail->Timeout = 30;
        $mail->SMTPKeepAlive = true;
        
        // Service names mapping
        $services = [
            'web-app' => 'Custom Web Application',
            'android-app' => 'Android App Development',
            'crm-cms' => 'CRM/CMS System',
            'epos' => 'ePOS Solution',
            'restaurant' => 'Restaurant Management',
            'inventory' => 'Inventory Management',
            'other' => 'Other'
        ];
        
        // Recipients
        $mail->setFrom(FROM_EMAIL, FROM_NAME);
        $mail->addAddress(RECIPIENT_EMAIL);
        $mail->addReplyTo(strip_tags($data['email']), strip_tags($data['name']));
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission - Nexofy Digital';
        
        // HTML body
        $mail->Body = '
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                .field { margin-bottom: 20px; }
                .label { font-weight: bold; color: #6366f1; }
                .value { margin-top: 5px; }
                .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 12px; color: #6b7280; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>New Contact Form Submission</h2>
                    <p>Nexofy Digital Website</p>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">Name:</div>
                        <div class="value">' . htmlspecialchars($data['name']) . '</div>
                    </div>
                    <div class="field">
                        <div class="label">Email:</div>
                        <div class="value">' . htmlspecialchars($data['email']) . '</div>
                    </div>
                    <div class="field">
                        <div class="label">Service Interested In:</div>
                        <div class="value">' . ($services[$data['service']] ?? 'Other') . '</div>
                    </div>
                    <div class="field">
                        <div class="label">Message:</div>
                        <div class="value">' . nl2br(htmlspecialchars($data['message'])) . '</div>
                    </div>
                    <div class="footer">
                        <p><strong>Submitted:</strong> ' . date('F j, Y \a\t g:i A') . '</p>
                        <p><strong>IP Address:</strong> ' . $_SERVER['REMOTE_ADDR'] . '</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        ';
        
        // Plain text alternative
        $mail->AltBody = "New contact form submission from Nexofy Digital website\n\n" .
                        "Name: " . strip_tags($data['name']) . "\n" .
                        "Email: " . strip_tags($data['email']) . "\n" .
                        "Service: " . ($services[$data['service']] ?? 'Other') . "\n" .
                        "Message:\n" . strip_tags($data['message']) . "\n\n" .
                        "---\n" .
                        "Submitted: " . date('Y-m-d H:i:s') . "\n" .
                        "IP Address: " . $_SERVER['REMOTE_ADDR'];
        
        $mail->send();
        return true;
        
    } catch (Exception $e) {
        // Save to backup file if email fails
        $backup_file = __DIR__ . '/contact_submissions.log';
        $log_entry = date('Y-m-d H:i:s') . " | SMTP Error: {$mail->ErrorInfo} | " . json_encode($data) . "\n";
        file_put_contents($backup_file, $log_entry, FILE_APPEND);
        
        throw new Exception('Email could not be sent. Error: ' . $mail->ErrorInfo);
    }
}

/**
 * Send email using basic PHP mail()
 */
function sendEmailBasic($data) {
    $to = RECIPIENT_EMAIL;
    $subject = '🚀 New Contact Form - Nexofy Digital';
    
    // Service names mapping
    $services = [
        'web-app' => 'Custom Web Application',
        'android-app' => 'Android App Development',
        'crm-cms' => 'CRM/CMS System',
        'epos' => 'ePOS Solution',
        'restaurant' => 'Restaurant Management',
        'inventory' => 'Inventory Management',
        'other' => 'Other'
    ];
    
    // Email body
    $message = "═══════════════════════════════════════\n";
    $message .= "  NEW CONTACT FORM SUBMISSION\n";
    $message .= "  Nexofy Digital Website\n";
    $message .= "═══════════════════════════════════════\n\n";
    $message .= "👤 NAME:\n   " . strip_tags($data['name']) . "\n\n";
    $message .= "📧 EMAIL:\n   " . strip_tags($data['email']) . "\n\n";
    $message .= "🎯 SERVICE:\n   " . ($services[$data['service']] ?? 'Other') . "\n\n";
    $message .= "💬 MESSAGE:\n   " . strip_tags($data['message']) . "\n\n";
    $message .= "───────────────────────────────────────\n";
    $message .= "📅 Submitted: " . date('F j, Y \a\t g:i A') . "\n";
    $message .= "🌐 IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
    $message .= "═══════════════════════════════════════\n";
    
    // Email headers
    $headers = [
        'From: Nexofy Digital <noreply@nexofydigital.com>',
        'Reply-To: ' . strip_tags($data['email']),
        'X-Mailer: PHP/' . phpversion(),
        'X-Priority: 1',
        'Content-Type: text/plain; charset=UTF-8'
    ];
    
    // Send email
    $success = mail($to, $subject, $message, implode("\r\n", $headers));
    
    // Also save to a backup file in case email fails
    if (!$success) {
        $backup_file = __DIR__ . '/contact_submissions.log';
        $log_entry = date('Y-m-d H:i:s') . " | " . json_encode($data) . "\n";
        file_put_contents($backup_file, $log_entry, FILE_APPEND);
    }
    
    return $success;
}

/**
 * Send email (wrapper function)
 */
function sendEmail($data) {
    if (USE_SMTP && defined('SMTP_HOST')) {
        return sendEmailSMTP($data);
    } else {
        return sendEmailBasic($data);
    }
}

// Main execution
try {
    // Get client IP
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    
    // Check rate limit
    $rateCheck = checkRateLimit($ip);
    if (!$rateCheck['allowed']) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => $rateCheck['message']
        ]);
        exit;
    }
    
    // Get POST data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        throw new Exception('Invalid request data');
    }
    
    // Validate input
    $errors = validateInput($data);
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => implode(', ', $errors)
        ]);
        exit;
    }
    
    // Send email
    $emailSent = sendEmail($data);
    
    if ($emailSent) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We\'ll get back to you soon.'
        ]);
    } else {
        throw new Exception('Failed to send email. Your message has been saved and we will contact you soon.');
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred. Please try again later or contact us directly at ' . RECIPIENT_EMAIL
    ]);
    
    // Log error
    error_log('Contact form error: ' . $e->getMessage());
}
