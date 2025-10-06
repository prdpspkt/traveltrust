<?php

namespace App\Commands;

use CodeIgniter\CLI\BaseCommand;
use CodeIgniter\CLI\CLI;

class AddSamplePartners extends BaseCommand
{
    protected $group       = 'Database';
    protected $name        = 'db:add-partners';
    protected $description = 'Add sample partner data';

    public function run(array $params)
    {
        $db = \Config\Database::connect();
        $prefix = $db->getPrefix();
        $forge = \Config\Database::forge();

        // Find the partners table (may have different prefixes)
        $tableName = null;
        $tables = $db->listTables();
        foreach ($tables as $table) {
            if (str_contains($table, 'partners')) {
                $tableName = $table;
                break;
            }
        }

        if (!$tableName) {
            CLI::write('Partners table does not exist. Available tables:', 'red');
            foreach ($tables as $table) {
                CLI::write(" - {$table}", 'yellow');
            }
            return;
        }

        CLI::write("Using table: {$tableName}", 'green');

        // Sample partner data
        $partners = [
            [
                'name' => 'Qatar Airways',
                'logo_url' => 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iODAiIGZpbGw9IiM4QjAwOEIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlFhdGFyIEFpcndheXM8L3RleHQ+PC9zdmc+',
                'website' => 'https://www.qatarairways.com',
                'display_order' => 1
            ],
            [
                'name' => 'Emirates',
                'logo_url' => 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iODAiIGZpbGw9IiNEQzE0M0MiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVtaXJhdGVzPC90ZXh0Pjwvc3ZnPg==',
                'website' => 'https://www.emirates.com',
                'display_order' => 2
            ],
            [
                'name' => 'Singapore Airlines',
                'logo_url' => 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iODAiIGZpbGw9IiMwMDNEOEEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlNpbmdhcG9yZSBBaXJsaW5lczwvdGV4dD48L3N2Zz4=',
                'website' => 'https://www.singaporeair.com',
                'display_order' => 3
            ],
            [
                'name' => 'Thai Airways',
                'logo_url' => 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iODAiIGZpbGw9IiM2RjI4OTAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlRoYWkgQWlyd2F5czwvdGV4dD48L3N2Zz4=',
                'website' => 'https://www.thaiairways.com',
                'display_order' => 4
            ],
            [
                'name' => 'Malaysia Airlines',
                'logo_url' => 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iODAiIGZpbGw9IiMwMDQwODIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1hbGF5c2lhIEFpcmxpbmVzPC90ZXh0Pjwvc3ZnPg==',
                'website' => 'https://www.malaysiaairlines.com',
                'display_order' => 5
            ],
            [
                'name' => 'Cathay Pacific',
                'logo_url' => 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iODAiIGZpbGw9IiMwMDU0NEUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNhdGhheSBQYWNpZmljPC90ZXh0Pjwvc3ZnPg==',
                'website' => 'https://www.cathaypacific.com',
                'display_order' => 6
            ]
        ];

        $inserted = 0;
        $builder = $db->table($tableName);

        foreach ($partners as $partner) {
            // Check if partner already exists
            $existing = $builder->where('name', $partner['name'])->get()->getRow();

            if (!$existing) {
                $partner['status'] = 'active';
                $partner['created_at'] = date('Y-m-d H:i:s');
                $partner['updated_at'] = date('Y-m-d H:i:s');

                if ($builder->insert($partner)) {
                    CLI::write("✓ Added partner: {$partner['name']}", 'green');
                    $inserted++;
                } else {
                    CLI::write("✗ Error adding {$partner['name']}", 'red');
                }
            } else {
                CLI::write("- Partner already exists: {$partner['name']}", 'yellow');
            }
        }

        CLI::newLine();
        CLI::write("========================================", 'white');
        CLI::write("Summary:", 'white');
        CLI::write("- {$inserted} new partners added", 'green');
        CLI::write("========================================", 'white');
    }
}
