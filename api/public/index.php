<?php
require __DIR__ . "/../bootstrap.php";

try {
    // Load routes configuration
    $routes = require __DIR__ . '/../inc/routes.php';

    // Debug output
    error_log("Original URI: " . $_SERVER['REQUEST_URI']);
    error_log("Script Name: " . $_SERVER['SCRIPT_NAME']);
    error_log("Method: " . $_SERVER['REQUEST_METHOD']);

    // Get current URI and clean it
    $uri = $_SERVER['REQUEST_URI'];

    // Remove script name from URI if present
    $scriptName = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME']));
    if ($scriptName !== '/') {
        $uri = str_replace($scriptName, '', $uri);
    }

    // Extract just the path component
    $uri = parse_url($uri, PHP_URL_PATH);

    // Ensure there's always a leading slash
    if (empty($uri)) {
        $uri = '/';
    }

    $method = $_SERVER['REQUEST_METHOD'];

    // Debug output
    error_log("Cleaned URI for routing: " . $uri);
    error_log("Routes: " . print_r($routes, true));

    // Initialize router with routes
    $router = new \App\Core\Router($routes['routes']);

    // Dispatch to appropriate controller
    $router->dispatch($uri, $method);

} catch (\Exception $e) {
    // Handle any errors
    $statusCode = $e->getCode() ?: 500;
    http_response_code($statusCode);
    echo json_encode([
        'error' => $e->getMessage(),
        'status' => $statusCode,
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ]);
}
