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
        Schema::table('attractions', function (Blueprint $table) {
            $table->integer('rating')
            ->nullable(true); 
       // $table->checkBetween('rating', 1, 5);// ovo ne radi pa mora db::statement tj direkt upit
        
    });
    DB::statement("ALTER TABLE attractions ADD CONSTRAINT check_rating CHECK (rating BETWEEN 1 AND 5)");

        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE attractions DROP CONSTRAINT check_rating");
        Schema::table('attractions', function (Blueprint $table) {
            $table->dropColumn('rating');
        });
    }
};
