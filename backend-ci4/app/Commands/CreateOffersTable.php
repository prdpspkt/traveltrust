<?php

namespace App\Commands;

use CodeIgniter\CLI\BaseCommand;
use CodeIgniter\CLI\CLI;

class CreateOffersTable extends BaseCommand
{
    protected $group       = 'Database';
    protected $name        = 'db:create-offers';
    protected $description = 'Create offers table';

    public function run(array $params)
    {
        $db = \Config\Database::connect();
        $forge = \Config\Database::forge();

        // Find existing table with 'offers' in name
        $tables = $db->listTables();
        $existingTable = null;
        foreach ($tables as $table) {
            if (str_contains($table, 'offers')) {
                $existingTable = $table;
                break;
            }
        }

        if ($existingTable) {
            CLI::write("Offers table already exists: {$existingTable}", 'yellow');
            return;
        }

        // Get the prefix used by partners table to be consistent
        $partnersTable = null;
        foreach ($tables as $table) {
            if (str_contains($table, 'partners')) {
                $partnersTable = $table;
                break;
            }
        }

        // Determine the correct prefix
        $prefix = '';
        if ($partnersTable) {
            $prefix = str_replace('partners', '', $partnersTable);
            CLI::write("Using prefix from partners table: '{$prefix}'", 'green');
        }

        $tableName = $prefix . 'offers';

        CLI::write("Creating table: {$tableName}", 'yellow');

        $forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'title' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
            ],
            'description' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'image_url' => [
                'type' => 'LONGTEXT',
                'null' => true,
            ],
            'display_order' => [
                'type' => 'INT',
                'constraint' => 11,
                'default' => 0,
            ],
            'status' => [
                'type' => 'ENUM',
                'constraint' => ['active', 'inactive'],
                'default' => 'active',
            ],
            'created_at' => [
                'type' => 'TIMESTAMP',
                'null' => false,
            ],
            'updated_at' => [
                'type' => 'TIMESTAMP',
                'null' => false,
            ],
        ]);
        $forge->addKey('id', true);
        $forge->createTable($tableName, false, ['ENGINE' => 'InnoDB']);

        CLI::write("✓ Table '{$tableName}' created successfully", 'green');
    }
}
