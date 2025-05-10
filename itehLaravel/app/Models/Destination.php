<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model{


    protected $fillable=['name','country','average_cost','description'];
    public function attractions()
    {
         return $this->hasMany(Attraction::class);
    }

    public function tripPlans()
    {
        return $this->hasMany(TripPlan::class);
    }
}
use HHasFactory;

