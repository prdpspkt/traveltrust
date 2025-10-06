<?php

namespace App\Models;

use CodeIgniter\Model;

class TestimonialModel extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'testimonials';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'client_name',
        'client_position',
        'client_photo',
        'testimonial_text',
        'rating',
        'destination',
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
        'client_name'      => 'required|min_length[2]|max_length[100]',
        'testimonial_text' => 'required|min_length[10]',
        'rating'           => 'permit_empty|integer|greater_than[0]|less_than[6]',
    ];
    protected $validationMessages   = [];
    protected $skipValidation       = false;

    /**
     * Get all testimonials with optional filters
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
