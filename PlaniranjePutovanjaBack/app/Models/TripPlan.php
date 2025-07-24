<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TripPlan extends Model
{
    use hasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function destinations()
    {
        return $this->belongsToMany(Destination::class);
    }
    public function attractions()
    {
        return $this->belongsToMany(Attraction::class);
    }

    protected $fillable = [
        'user_id',
        'title',
        'budget',
        'destination_id',
        'start_date',
        'end_date',
    ];


}
