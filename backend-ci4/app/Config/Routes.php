<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->group('api', [
    'namespace' => 'App\Controllers',
    'filter'    => 'cors'
], function($routes) {

    // Handle OPTIONS requests for CORS preflight
    $routes->options('(:any)', function() {
        return response()->setStatusCode(200);
    });

    // ---------- GRAPHQL ----------
    // Accept both GET and POST for GraphQL (GET for GraphiQL/testing, POST for queries)
    $routes->match(['get', 'post'], 'graphql', 'GraphQL::index');

});

