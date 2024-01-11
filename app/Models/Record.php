<?php

namespace App\Models;

use CodeIgniter\Model;

class Record extends Model
{
    protected $table            = 'records';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        "date",
        "project_id",
        "hours",
        "row"
    ];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];

    public function getRecords($startDate, $endDate)
    {
        $builder = $this->db->table('records');
        // $builder->select('records.*, users.name as user_name');
        // $builder->join('users', 'users.id = records.user_id');
        $builder->where('date >=', $startDate);
        $builder->where('date <=', $endDate);
        $builder->orderBy('date', 'ASC');
        $query = $builder->get();
        return $query->getResult();
    }
}
