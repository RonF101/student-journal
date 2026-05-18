<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CoreProductionSeeder extends Seeder
{
    /**
     * Seed only idempotent lookup data required for production.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            ArticleStatusSeeder::class,
            CategorySeeder::class,
        ]);
    }
}
