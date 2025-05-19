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
            'filters' => $request->only('search', 'nombre', 'apellido'),
            'docentes' => Docente::query()
                ->orderBy('apellido')
                ->paginate(1)
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
                'apellido'=> 'required|string|max:45|min:2',
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

    public function update(Request $request, Docente $docente)
    {
        $validated = $request->validate([
            'nombre' => [
                'required',
                'string',
                'unique:docentes,nombre,' . $docente->id
            ],
            'apellido' => [
                'required',
                'string',
                'unique:docentes,apellido,' . $docente->id
            ],
            'rol' => [
                'required',
                'string',
                'unique:docentes,rol,' . $docente->id
            ],
        ]);

        try {
            $docente->update($validated);
            return redirect()->route('admin.docentes.index')
                ->with('success', 'Docente actualizado exitosamente');
        } catch (\Exception $e) {
            return back()
                ->with('error', 'No se pudo actualizar el docente: ' . $e->getMessage());
        }
    }

    public function destroy(Docente $docente)
    {
        try {
            $docente->delete();
            return redirect()->route('admin.docentes.index')
                ->with('success', 'Docente eliminado exitosamente');
        } catch (\Exception $e) {
            return redirect()->route('admin.docentes.index')
                ->with('error', 'No se pudo eliminar el docente: ' . $e->getMessage());
        }
    }

    public function getDocentes() {
        return Docente::select('id', 'nombre', 'apellido', 'rol')
            ->orderBy('apellido')
            ->get();
    }
}
