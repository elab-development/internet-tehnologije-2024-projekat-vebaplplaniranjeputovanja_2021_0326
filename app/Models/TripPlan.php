<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TripPlan extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function destinations()
    {
        return $this->belongsToMany(Destination::class);
    }

    protected $fillable = [
        // other fields
        'budget'
    ];
}
