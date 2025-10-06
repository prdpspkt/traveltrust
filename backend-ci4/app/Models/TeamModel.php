<?php

namespace App\Models;

use CodeIgniter\Model;

class TeamModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'members';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'name',
        'position',
        'bio',
        'photo_url',
        'email',
        'phone',
        'facebook',
        'twitter',
        'linkedin',
        'display_order',
        'status'
    ];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    // Validation
    protected $validationRules      = [
        'name'     => 'required|min_length[2]|max_length[100]',
        'position' => 'required|min_length[2]|max_length[100]',
        'email'    => 'permit_empty|valid_email',
    ];
    protected $validationMessages   = [];
    protected $skipValidation       = false;

    /**
     * Get all team members with optional status filter
     */
    public function getAll($status = null)
    {
        $builder = $this->builder();

        if ($status && $status !== 'all') {
            $builder->where('status', $status);
        }

        return $builder->orderBy('display_order', 'ASC')->get()->getResultArray();
    }
}
