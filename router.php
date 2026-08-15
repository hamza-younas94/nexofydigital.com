<?php
/**
 * Local dev router for `php -S` — mirrors the production .htaccess clean-URL rules.
 * NOT used in production (Apache/.htaccess handles it there). Never served as a URL.
 *
 * Usage: php -S 127.0.0.1:8787 router.php
 */

$root = __DIR__;
$uri  = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/');
$path = realpath($root . $uri);

// Contact form endpoint → hand to PHP.
if ($uri === '/contact.php') {
    require $root . '/contact.php';
    return true;
}

// .html requested directly → 301 to the clean URL (professional), even though
// the file exists on disk. Mirrors the production .htaccess THE_REQUEST rule.
if (preg_match('#^(.+)\.html$#', $uri, $m)) {
    header('Location: ' . $m[1], true, 301);
    return true;
}

// Real static asset (css/js/svg/png…) → let the built-in server serve it,
// but keep other PHP files private like production does.
if ($uri !== '/' && $path && is_file($path) && strpos($path, $root) === 0) {
    if (preg_match('#\.php$#', $path)) {
        http_response_code(403);
        echo 'Forbidden';
        return true;
    }
    return false; // built-in server serves the file with the right MIME type
}

// Homepage.
if ($uri === '/' || $uri === '') {
    header('Content-Type: text/html; charset=UTF-8');
    readfile($root . '/index.html');
    return true;
}

// Clean URL → matching .html file.
$file = $root . rtrim($uri, '/') . '.html';
if (is_file($file)) {
    header('Content-Type: text/html; charset=UTF-8');
    readfile($file);
    return true;
}

// Nothing matched → branded 404.
http_response_code(404);
header('Content-Type: text/html; charset=UTF-8');
readfile($root . '/404.html');
return true;
