<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

/**
 * Cross-Origin Resource Sharing (CORS) Configuration
 */
class Cors extends BaseConfig
{
    /**
     * Allowed origins
     * Use '*' to allow all origins (development only)
     * In production, specify exact origins like ['http://localhost:3000', 'https://yourdomain.com']
     */
    public array $allowedOrigins = ['*'];

    /**
     * Allowed HTTP methods
     */
    public array $allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];

    /**
     * Allowed headers
     */
    public array $allowedHeaders = ['Content-Type', 'Authorization', 'X-Requested-With'];

    /**
     * Exposed headers
     */
    public array $exposedHeaders = [];

    /**
     * Max age for preflight requests (in seconds)
     */
    public int $maxAge = 7200;

    /**
     * Whether to allow credentials
     */
    public bool $supportsCredentials = true;
}
