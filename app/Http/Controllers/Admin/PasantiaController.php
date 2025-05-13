<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pasantia;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PasantiaController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('admin/pasantias/Index', [
            'filters' => $request->only('search', 'estado'),
            'pasantias' => Pasantia::query()
                ->orderBy('fecha_inicio')
                ->filter($request->only('search', 'estado'))
                ->paginate()
                ->appends($request->all())
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Pasantias/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        Pasantia::create(
            $request->validated()
        );

        return Redirect::route('pasantias.index')->with('success', 'Pasantía creada exitosamente.');
    }

    public function update(Pasantia $pasantia, Request $request): RedirectResponse
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
