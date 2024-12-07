<?php
// inc/routes.php
use App\Controller\AccountController;
use App\Controller\CartController;
use App\Controller\ProductController;

return [
    'routes' => [
        [
            'pattern' => '/cart',
            'method' => 'GET',
            'handler' => [CartController::class, 'getCart']
        ],
        [
            'pattern' => '/cart/items',
            'method' => 'POST',
            'handler' => [CartController::class, 'upsertCartItem']
        ],
        [
            'pattern' => '/cart/items',
            'method' => 'PUT',
            'handler' => [CartController::class, 'upsertCartItem']
        ],
        [
            'pattern' => '/cart/items',
            'method' => 'DELETE',
            'handler' => [CartController::class, 'deleteCartItem']
        ],
        [
            'pattern' => '/accounts',
            'method' => 'GET',
            'handler' => [AccountController::class, 'getAllAccounts']
        ],
        [
            'pattern' => '/products',
            'method' => 'GET',
            'handler' => [ProductController::class, 'getAllProducts']
        ]
    ]
];
