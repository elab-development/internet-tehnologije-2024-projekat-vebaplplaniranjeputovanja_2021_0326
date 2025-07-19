<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    public function attractions()
    {
        return $this->hasMany(Attraction::class);
    }

    public function tripPlans()
    {
        return $this->belongsToMany(TripPlan::class);
    }

}
