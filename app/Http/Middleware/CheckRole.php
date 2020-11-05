<?php

namespace App\Http\Middleware;

use Closure;

class CheckRole
{
    public function handle($request, Closure $next, string $role)
    {

        $roles = explode(':', $role);

        foreach ($roles as $role) {
            if ($request->user()->hasRole($role)) return $next($request);
        }

        return redirect()->route('tests.show-all')->with('status_danger', 'Нет прав');
    }
}
