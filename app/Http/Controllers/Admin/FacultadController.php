<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Facultad;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FacultadController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('admin/facultades/Index', [
            'filters' => $request->only('search', 'nombre'),
            'facultades' => Facultad::query()
                ->orderBy('nombre')
                ->paginate(10)
                ->withQueryString()  // Mantiene los parámetros de búsqueda en la paginación
        ]);
    }


    public function store(Request $request)
    {   
        try {
            $validated = $request->validate([
                'nombre'=> 'required|string|max:45|min:2',
            ]);
    
            Facultad::create($validated); // Usar $validated aquí
    
            return redirect()->route('facultad.index')->with('success', 'Facultad creada.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al crear la facultad: ' . $e->getMessage());
        }
    }

    public function update(Request $request, Facultad $facultad)
    {
        $validated = $request->validate([
            'nombre' => [
                'required',
                'string',
                'unique:facultades,nombre,' . $facultad->id
            ],
        ]);

        try {
            $facultad->update($validated);
            return redirect()->route('admin.facultades.index')
                ->with('success', 'Facultad actualizado exitosamente');
        } catch (\Exception $e) {
            return back()
                ->with('error', 'No se pudo actualizar la facultad: ' . $e->getMessage());
        }
    }

    public function destroy(Facultad $facultad)
    {
        try {
            $facultad->delete();
            return redirect()->route('admin.facultades.index')
                ->with('success', 'Facultad eliminada exitosamente');
        } catch (\Exception $e) {
            return redirect()->route('admin.facultades.index')
                ->with('error', 'No se pudo eliminar la facultad: ' . $e->getMessage());
        }
    }

    public function getFacultades() {
        return Facultad::select('id', 'nombre')
            ->orderBy('nombre')
            ->get();
    }
}
