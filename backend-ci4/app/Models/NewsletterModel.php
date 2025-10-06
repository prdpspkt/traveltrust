<?php

namespace App\Models;

use CodeIgniter\Model;

class NewsletterModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'subscribers';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'email',
        'name',
        'status',
        'subscribed_at',
        'unsubscribed_at'
    ];

    // Dates
    protected $useTimestamps = false;

    // Validation
    protected $validationRules      = [
        'email' => 'required|valid_email|is_unique[subscribers.email]',
    ];
    protected $validationMessages   = [];
    protected $skipValidation       = false;

    /**
     * Subscribe to newsletter
     */
    public function subscribe($email, $name = '')
    {
        // Check if email already exists
        $existing = $this->where('email', $email)->first();

        if ($existing) {
            // If unsubscribed, reactivate
            if ($existing['status'] === 'unsubscribed') {
                return $this->update($existing['id'], [
                    'status' => 'active',
                    'subscribed_at' => date('Y-m-d H:i:s'),
                    'unsubscribed_at' => null
                ]);
            }
            return false; // Already subscribed
        }

        // New subscription
        return $this->insert([
            'email' => $email,
            'name' => $name,
            'status' => 'active',
            'subscribed_at' => date('Y-m-d H:i:s')
        ]);
    }

    /**
     * Unsubscribe from newsletter
     */
    public function unsubscribe($email)
    {
        return $this->where('email', $email)
                    ->set([
                        'status' => 'unsubscribed',
                        'unsubscribed_at' => date('Y-m-d H:i:s')
                    ])
                    ->update();
    }

    /**
     * Get all subscribers with optional status filter
     */
    public function getAll($status = null)
    {
        $builder = $this->builder();

        if ($status && $status !== 'all') {
            $builder->where('status', $status);
        }

        return $builder->orderBy('subscribed_at', 'DESC')->get()->getResultArray();
    }
}
