<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Carrera;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CarreraController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('admin/carreras/Index', [
            'filters' => $request->only('search', 'nombre'),
            'carreras' => Carrera::query()
                ->orderBy('nombre')
                ->paginate(10)
                ->withQueryString()  // Mantiene los parámetros de búsqueda en la paginación
        ]);
    }

    public function store(Request $request)
    {   
        try {
            $validated = $request->validate([
                'nombre'=> [
                'required',
                'string|max:45|min:2',
                'unique:carreras,nombre,' . $carrera->id
            ],
                'facultad_id'=> 'required|integer',
            ]);
    
            Carrera::create($validated); // Usar $validated aquí
    
            return redirect()->route('carrera.index')->with('success', 'carrera creada.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al crear la carrera: ' . $e->getMessage());
        }
    }

    public function update(Request $request, Carrera $carrera)
    {
        $validated = $request->validate([
            'nombre' => [
                'required',
                'string',
                'unique:carreras,nombre,' . $carrera->id
            ],
            'facultad_id' => [
                'required',
                'integer',
                'unique:carreras,facultad_id,' . $carrera->id
            ],
        ]);

        try {
            $carrera->update($validated);
            return redirect()->route('admin.carreras.index')
                ->with('success', 'Carrera actualizado exitosamente');
        } catch (\Exception $e) {
            return back()
                ->with('error', 'No se pudo actualizar la carrera: ' . $e->getMessage());
        }
    }

    public function destroy(Carreras $facultad)
    {
        try {
            $facultad->delete();
            return redirect()->route('admin.carreras.index')
                ->with('success', 'Carrera eliminada exitosamente');
        } catch (\Exception $e) {
            return redirect()->route('admin.carreras.index')
                ->with('error', 'No se pudo eliminar la carrera: ' . $e->getMessage());
        }
    }

    public function getCarreras() {
        return Facultad::select('id', 'nombre', 'facultad_id')
            ->orderBy('nombre')
            ->get();
    }
}
