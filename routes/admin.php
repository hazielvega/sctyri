<?php

use App\Http\Controllers\Admin\ConvenioTipoController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\PasantiaController;
use App\Http\Controllers\Admin\DocenteController;
use App\Http\Controllers\Admin\AlumnoController;
use App\Http\Controllers\Admin\CarreraController;
use App\Http\Controllers\Admin\FacultadController;


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

// Route::resource('/pasantias', PasantiaController::class)
//     ->names([
//         'index' => 'pasantias.index',
//         'create' => 'pasantias.create',
//         'store' => 'pasantias.store',
//         'show' => 'pasantias.show',
//         'edit' => 'pasantias.edit',
//         'update' => 'pasantias.update',
//         'destroy' => 'pasantias.destroy'
//     ])
//     ->middleware('auth');

// Route::resource('/docentes', DocenteController::class)
//     ->names([
//         'index' => 'docentes.index',
//         'create' => 'docentes.create',
//         'store' => 'docentes.store',
//         'show' => 'docentes.show',
//         'edit' => 'docentes.edit',
//         'update' => 'docentes.update',
//         'destroy' => 'docentes.destroy'
//     ])
//     ->middleware('auth');

Route::get('/admin/docentes/list', [DocenteController::class, 'getDocentes']);
Route::get('/admin/alumnos/list', [AlumnoController::class, 'getAlumnos']);
Route::get('/admin/pasantias/list', [PasantiaController::class, 'getPasantias']);
Route::get('/admin/carreras/list', [CarreraController::class, 'getCarreras']);
Route::get('admin/facultades/list', [FacultadController::class, 'getFacultades']);

//Rutas para pasantías
Route::middleware('auth')->group(function () {
    Route::redirect('pasantias', 'pasantias.index');

    Route::resource('/pasantias', PasantiaController::class)
        ->names([
            'index' => 'pasantias.index',
            'create' => 'pasantias.create',
            'store' => 'pasantias.store',
            //'show' => 'pasantias.show',
            'edit' => 'pasantias.edit',
            'update' => 'pasantias.update',
            'destroy' => 'pasantias.destroy'
        ]);


    Route::resource('docentes', DocenteController::class)
    ->names([
        'index' => 'docentes.index',
        'create' => 'docentes.create',
        'store' => 'docentes.store',
        //'show' => 'docentes.show',
        'edit' => 'docentes.edit',
        'update' => 'docentes.update',
        'destroy' => 'docentes.destroy'
    ]);

    Route::resource('alumnos', AlumnoController::class)
    ->names([
        'index' => 'alumnos.index',
        'create' => 'alumnos.create',
        'store' => 'alumnos.store',
        //'show' => 'alumnos.show',
        'edit' => 'alumnos.edit',
        'update' => 'alumnos.update',
        'destroy' => 'alumnos.destroy'
    ]);

    Route::resource('carreras', CarreraController::class)
    ->names([
        'index' => 'carreras.index',
        'create' => 'carreras.create',
        'store' => 'carreras.store',
        //'show' => 'carreras.show',
        'edit' => 'carreras.edit',
        'update' => 'carreras.update',
        'destroy' => 'carreras.destroy'
    ]);

    Route::resource('facultades', FacultadController::class)
    ->names([
        'index' => 'facultades.index',
        'create' => 'facultades.create',
        'store' => 'facultades.store',
        //'show' => 'facultades.show',
        'edit' => 'facultades.edit',
        'update' => 'facultades.update',
        'destroy' => 'facultades.destroy'
    ]);
});
// Route::middleware('auth')->group(function () {
//     Route::redirect('settings', 'settings/profile');

//     Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

//     Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
//     Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

//     Route::get('settings/appearance', function () {
//         return Inertia::render('settings/appearance');
//     })->name('appearance');
// });