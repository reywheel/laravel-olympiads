<?php

namespace App\Providers;

use App\Policies\ResultPolicy;
use App\Policies\TestPolicy;
use App\Policies\UserPolicy;
use App\Result;
use App\Test;
use App\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Test::class => TestPolicy::class,
        User::class => UserPolicy::class,
        Result::class => ResultPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
