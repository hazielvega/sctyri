<?php

use App\Http\Controllers\Admin\ConvenioTipoController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;


Route::get('/', [DashboardController::class, 'index'])
    ->name('dashboard')
    ->middleware('auth');

Route::resource('convenio-tipos', ConvenioTipoController::class)
    ->names([
        'index' => 'convenio-tipos.index',
        'create' => 'convenio-tipos.create',
        'store' => 'convenio-tipos.store',
        'show' => 'convenio-tipos.show',
        'edit' => 'convenio-tipos.edit',
        'update' => 'convenio-tipos.update',
        'destroy' => 'convenio-tipos.destroy',
    ])
    ->middleware('auth');
    // routes/web.php

Route::get('convenio-tipos/check-nombre', [ConvenioTipoController::class, 'checkNombre'])->name('convenio-tipos.check-nombre');

