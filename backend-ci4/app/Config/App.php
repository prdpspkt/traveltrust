<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class App extends BaseConfig
{
    /**
     * Base Site URL
     */
    public string $baseURL = 'http://localhost:8080/';

    /**
     * Allowed Hostnames
     */
    public array $allowedHostnames = [];

    /**
     * Index File
     */
    public string $indexPage = '';

    /**
     * URI Protocol
     */
    public string $uriProtocol = 'REQUEST_URI';

    /**
     * Default Locale
     */
    public string $defaultLocale = 'en';

    /**
     * Negotiate Locale
     */
    public bool $negotiateLocale = false;

    /**
     * Supported Locales
     */
    public array $supportedLocales = ['en'];

    /**
     * Application Timezone
     */
    public string $appTimezone = 'Asia/Kathmandu';

    /**
     * Default Character Set
     */
    public string $charset = 'UTF-8';

    /**
     * Force Global Secure Requests
     */
    public bool $forceGlobalSecureRequests = false;

    /**
     * Session Variables
     */
    public string $sessionDriver            = 'CodeIgniter\Session\Handlers\FileHandler';
    public string $sessionCookieName        = 'traveltrust_session';
    public int    $sessionExpiration        = 7200;
    public string $sessionSavePath          = WRITEPATH . 'session';
    public bool   $sessionMatchIP           = false;
    public int    $sessionTimeToUpdate      = 300;
    public bool   $sessionRegenerateDestroy = false;

    /**
     * Cookie Settings
     */
    public string $cookiePrefix   = '';
    public string $cookieDomain   = '';
    public string $cookiePath     = '/';
    public bool   $cookieSecure   = false;  // Set to true in production with HTTPS
    public bool   $cookieHTTPOnly = true;   // Prevent JavaScript access for security
    public ?string $cookieSameSite = 'Lax'; // Use 'None' in production with Secure=true

    /**
     * Reverse Proxy IPs
     */
    public array $proxyIPs = [];

    /**
     * CSRF Protection
     */
    public bool   $CSRFProtection  = false;  // Disabled for API
    public string $CSRFTokenName   = 'csrf_token_name';
    public string $CSRFHeaderName  = 'X-CSRF-TOKEN';
    public string $CSRFCookieName  = 'csrf_cookie_name';
    public int    $CSRFExpire      = 7200;
    public bool   $CSRFRegenerate  = true;
    public bool   $CSRFRedirect    = false;
    public string $CSRFSameSite    = 'Lax';

    /**
     * Content Security Policy
     */
    public bool $CSPEnabled = false;
}
