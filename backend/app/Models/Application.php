<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'job_id',
        'applicant_id',
        'cover_letter',
        'status',
    ];

    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    public function applicant()
    {
        return $this->belongsTo(User::class, 'applicant_id');
    }
}
