<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attraction>
 */
class AttractionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(2, true),
            'destination_id' => \App\Models\Destination::factory(), // automatski pravi destination
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 10, 500),
        ];
    }
}
