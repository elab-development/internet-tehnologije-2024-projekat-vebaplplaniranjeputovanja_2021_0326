<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attraction_trip_plan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trip_plan_id')->constrained()->cascadeOnDelete();
            $table->foreignId('attraction_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attraction_trip_plan');
    }
};
