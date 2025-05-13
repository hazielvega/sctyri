<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Docente;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DocenteController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('admin/docentes/Index', [
            'filters' => $request->only('search', 'nombre'),
            'docentes' => Docente::query()
                ->orderBy('nombre')
                ->paginate()
                ->withQueryString()  // Mantiene los parámetros de búsqueda en la paginación
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/docentes/Create');
    }

    public function show(Docente $docente): Response
    {
        
    }

    public function store(Request $request)
    {   
        try {
            $validated = $request->validate([
                'nombre'=> 'required|string|max:45|min:2',
                'rol' => 'required|string|max:45|min:2',
            ]);
    
            Docente::create($validated); // Usar $validated aquí
    
            return redirect()->route('docentes.index')->with('success', 'Docente creada.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al crear el docente: ' . $e->getMessage());
        }
    }

    public function edit(Docente $docente): Response
    {
        return Inertia::render('admin/docentes/Edit', [
            'docente' => $docente,
        ]);
    }

    public function update(Docente $docente, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nombre'=> 'required|string|max:45|min:2',
            'rol' => 'required|string|max:45|min:2',
        ]);

        $docente->update($validated);

        return Redirect::back()->with('success', 'Docente actualizada.');
    }

    public function destroy(Docente $docente): RedirectResponse
    {
        $docente->delete();

        return Redirect::back()->with('success', 'Docente eliminada.');
    }
}
