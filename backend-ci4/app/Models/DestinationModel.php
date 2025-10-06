<?php

namespace App\Models;

use CodeIgniter\Model;

class DestinationModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'destinations';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'name',
        'country',
        'description',
        'image_url',
        'icon',
        'is_featured',
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
        'name'    => 'required|min_length[2]|max_length[100]',
        'country' => 'required|min_length[2]|max_length[100]',
    ];
    protected $validationMessages   = [];
    protected $skipValidation       = false;

    /**
     * Get all destinations with optional filters
     */
    public function getAll($status = null, $featured = null)
    {
        $builder = $this->builder();

        if ($status && $status !== 'all') {
            $builder->where('status', $status);
        }

        if ($featured !== null) {
            $builder->where('is_featured', $featured);
        }

        return $builder->orderBy('display_order', 'ASC')->get()->getResultArray();
    }
}
