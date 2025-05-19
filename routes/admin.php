<?php

use App\Http\Controllers\Admin\ConvenioTipoController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\PasantiaController;
use App\Http\Controllers\Admin\DocenteController;


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

Route::resource('/pasantias', PasantiaController::class)
    ->names([
        'index' => 'pasantias.index',
        'create' => 'pasantias.create',
        'store' => 'pasantias.store',
        'show' => 'pasantias.show',
        'edit' => 'pasantias.edit',
        'update' => 'pasantias.update',
        'destroy' => 'pasantias.destroy'
    ])
    ->middleware('auth');

Route::resource('/docentes', DocenteController::class)
    ->names([
        'index' => 'docentes.index',
        'create' => 'docentes.create',
        'store' => 'docentes.store',
        'show' => 'docentes.show',
        'edit' => 'docentes.edit',
        'update' => 'docentes.update',
        'destroy' => 'docentes.destroy'
    ])
    ->middleware('auth');

Route::get('/admin/docentes/list', [DocenteController::class, 'getDocentes']);