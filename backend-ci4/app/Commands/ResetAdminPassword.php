<?php

namespace App\Commands;

use CodeIgniter\CLI\BaseCommand;
use CodeIgniter\CLI\CLI;
use App\Models\AdminModel;

class ResetAdminPassword extends BaseCommand
{
    protected $group       = 'Database';
    protected $name        = 'admin:reset-password';
    protected $description = 'Reset admin user password';

    public function run(array $params)
    {
        $adminModel = new AdminModel();

        // Get username
        $username = CLI::prompt('Enter admin username', 'admin');

        // Check if user exists
        $user = $adminModel->where('username', $username)->first();

        if (!$user) {
            CLI::error("User '{$username}' not found!");
            return;
        }

        // Get new password
        $password = CLI::prompt('Enter new password (min 8 characters)');

        if (strlen($password) < 8) {
            CLI::error('Password must be at least 8 characters long');
            return;
        }

        // Hash and update password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        if ($adminModel->update($user['id'], ['password' => $hashedPassword])) {
            CLI::write('Password updated successfully!', 'green');
            CLI::write('Username: ' . $username);
            CLI::write('New password: ' . $password);

            // Test the password
            if (password_verify($password, $hashedPassword)) {
                CLI::write('Password verification: OK', 'green');
            } else {
                CLI::error('Password verification: FAILED');
            }
        } else {
            CLI::error('Failed to update password');
        }
    }
}
