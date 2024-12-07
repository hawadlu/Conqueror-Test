<?php
namespace App\Core;

class Router {
    private array $routes;

    public function __construct(array $routes) {
        $this->routes = $routes;
    }

    public function dispatch(string $uri, string $method) {
        $uri = rtrim($uri, '/');

        foreach ($this->routes as $route) {
            if ($route['pattern'] === $uri && $route['method'] === $method) {
                [$controller, $action] = $route['handler'];
                $controllerInstance = new $controller();
                return $controllerInstance->$action();
            }
        }

        throw new \Exception("Route not found for: $method $uri", 404);
    }
}
