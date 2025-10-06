<?php

namespace Config;

use CodeIgniter\Modules\Modules as BaseModules;

/**
 * Modules Configuration.
 *
 * NOTE: This class is required prior to Autoloader instantiation,
 * and does not extend BaseConfig.
 *
 * @immutable
 */
class Modules extends BaseModules
{
    /**
     * --------------------------------------------------------------------------
     * Enable Auto-Discovery?
     * --------------------------------------------------------------------------
     *
     * If true, then auto-discovery will happen across all elements listed in
     * $activeExplorers below. If false, no auto-discovery will happen at all,
     * giving a slight performance boost.
     */
    public $enabled = true;

    /**
     * --------------------------------------------------------------------------
     * Enable Auto-Discovery Within Composer Packages?
     * --------------------------------------------------------------------------
     *
     * If true, then auto-discovery will happen across all namespaces loaded
     * by Composer, as well as the namespaces configured locally.
     */
    public $discoverInComposer = true;

    /**
     * --------------------------------------------------------------------------
     * Composer Packages
     * --------------------------------------------------------------------------
     *
     * Lists composer packages to auto-discover from.
     *
     * @var list<string>
     */
    public $composerPackages = [];

    /**
     * --------------------------------------------------------------------------
     * Auto-Discovery Rules
     * --------------------------------------------------------------------------
     *
     * Lists the aliases of all discovery classes that will be active and used
     * during the current application request.
     *
     * If it is not listed here, only the base application elements will be
     * used.
     *
     * @var list<string>
     */
    public $activeExplorers = [
        'events',
        'registrars',
        'routes',
        'services',
    ];
}
