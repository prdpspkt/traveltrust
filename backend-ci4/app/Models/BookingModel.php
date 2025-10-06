<?php

namespace App\Models;

use CodeIgniter\Model;

class BookingModel extends Model
{
    protected $DBGroup = 'default';
    protected $table = 'bookings';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $protectFields = true;

    protected $allowedFields = [
        'name',
        'email',
        'phone',
        'from_airport',
        'to_airport',
        'departure_date',
        'return_date',
        'adults',
        'children',
        'message',
        'status'
    ];

    protected bool $allowEmptyInserts = false;
    protected bool $updateOnlyChanged = true;

    protected array $casts = [];
    protected array $castHandlers = [];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';

    // Validation
    protected $validationRules = [
        'name' => 'required|min_length[3]|max_length[255]',
        'email' => 'required|valid_email|max_length[255]',
        'phone' => 'required|min_length[10]|max_length[50]',
        'from_airport' => 'required|max_length[255]',
        'to_airport' => 'required|max_length[255]',
        'departure_date' => 'required|valid_date',
        'adults' => 'required|integer|greater_than[0]',
        'children' => 'integer',
        'status' => 'permit_empty|in_list[pending,contacted,confirmed,cancelled,completed]'
    ];

    // Validation rules for updates (partial data allowed)
    protected $updateValidationRules = [
        'name' => 'permit_empty|min_length[3]|max_length[255]',
        'email' => 'permit_empty|valid_email|max_length[255]',
        'phone' => 'permit_empty|min_length[10]|max_length[50]',
        'from_airport' => 'permit_empty|max_length[255]',
        'to_airport' => 'permit_empty|max_length[255]',
        'departure_date' => 'permit_empty|valid_date',
        'adults' => 'permit_empty|integer|greater_than[0]',
        'children' => 'permit_empty|integer',
        'status' => 'permit_empty|in_list[pending,contacted,confirmed,cancelled,completed]'
    ];

    protected $validationMessages = [
        'name' => [
            'required' => 'Name is required',
            'min_length' => 'Name must be at least 3 characters long'
        ],
        'email' => [
            'required' => 'Email is required',
            'valid_email' => 'Please provide a valid email address'
        ],
        'phone' => [
            'required' => 'Phone number is required'
        ],
        'from_airport' => [
            'required' => 'Departure airport is required'
        ],
        'to_airport' => [
            'required' => 'Destination airport is required'
        ],
        'departure_date' => [
            'required' => 'Departure date is required',
            'valid_date' => 'Please provide a valid date'
        ],
        'adults' => [
            'required' => 'Number of adults is required',
            'greater_than' => 'At least one adult passenger is required'
        ]
    ];

    protected $skipValidation = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert = [];
    protected $afterInsert = [];
    protected $beforeUpdate = [];
    protected $afterUpdate = [];
    protected $beforeFind = [];
    protected $afterFind = [];
    protected $beforeDelete = [];
    protected $afterDelete = [];

    /**
     * Get all bookings with optional status filter
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
