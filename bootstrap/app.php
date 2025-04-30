<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        // Configura rutas adicionales dentro de una función de callback.
        then: function () {
            Route::middleware('web', 'auth')  // Aplica los middleware 'web' y 'auth' a las rutas.
                ->prefix('admin')  // Agrega el prefijo 'admin' a las rutas.
                ->name('admin.')  // Asigna el prefijo 'admin.' a los nombres de las rutas.
                ->group(base_path('routes/admin.php'));  // Carga el grupo de rutas desde 'admin.php'.
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
