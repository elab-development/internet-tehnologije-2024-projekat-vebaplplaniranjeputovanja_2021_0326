<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;
    public function attractions()
    {
        return $this->hasMany(Attraction::class);
    }

    public function tripPlans()
    {
        return $this->belongsToMany(TripPlan::class);
    }
    protected $fillable = [
        'name',
        'country',
        'description',
        'image'
    ];


}
