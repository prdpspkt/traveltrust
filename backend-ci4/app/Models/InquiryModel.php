<?php

namespace App\Models;

use CodeIgniter\Model;

class InquiryModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'inquiries';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'status',
    ];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    // Validation
    protected $validationRules      = [
        'name'         => 'required|min_length[2]|max_length[100]',
        'email'             => 'required|valid_email',
        'phone'             => 'permit_empty|min_length[10]',
        'message' => 'required|max_length[1000]',
        'subject'   => 'permit_empty|max_length[255]',
    ];
    protected $validationMessages   = [];
    protected $skipValidation       = false;

    /**
     * Get all inquiries with optional status filter
     */
    public function getAll($status = null)
    {
        $builder = $this->builder();

        if ($status && $status !== 'all') {
            $builder->where('status', $status);
        }

        return $builder->orderBy('created_at', 'DESC')->get()->getResultArray();
    }
}
