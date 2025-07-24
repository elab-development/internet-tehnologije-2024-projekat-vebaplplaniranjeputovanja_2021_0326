<?php

namespace Database\Seeders;

use App\Models\Attraction;
use App\Models\Destination;
use App\Models\TripPlan;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Napravi 10 destinacija
        Destination::factory(10)->create()->each(function ($destination) {
            // Svaka destinacija dobija 3 atrakcije
            Attraction::factory(3)->create([
                'destination_id' => $destination->id
            ]);
        });

        // Napravi jednog korisnika sa trip planovima
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'role' => 'user'
        ])->each(function ($user) {
            TripPlan::factory(5)->create([
                'user_id' => $user->id,

            ]);
        });
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ])->each(function ($user) {
            TripPlan::factory(1)->create([
                'user_id' => $user->id
            ]);
        });
    }
}
