<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use App\Models\Pasantia;
use App\Http\Requests\PasantiaStoreRequest;
use App\Http\Requests\PasantiaUpdateRequest;
use Inertia\Inertia;
use Inertia\Response;

class PasantiaController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/pasantias/Index', [
            'filters' => Request::all('search', 'estado'),
            'pasantias' => Pasantia::query()
                ->orderBy('fecha_inicio')
                ->filter(Request::only('search', 'estado'))
                ->paginate()
                ->appends(Request::all())
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Pasantias/Create');
    }

    public function store(PasantiaStoreRequest $request): RedirectResponse
    {
        Pasantia::create(
            $request->validated()
        );

        return Redirect::route('pasantias.index')->with('success', 'Pasantía creada exitosamente.');
    }

    public function update(Pasantia $pasantia, PasantiaUpdateRequest $request): RedirectResponse
    {
        $pasantia->update(
            $request->validated()
        );

        return Redirect::back()->with('success', 'Pasantía actualizada.');
    }

    public function destroy(Pasantia $pasantia): RedirectResponse
    {
        $pasantia->delete();

        return Redirect::back()->with('success', 'Pasantía eliminada.');
    }
}
