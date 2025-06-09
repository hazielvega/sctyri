<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alumno;
use App\Models\AlumnoCarrera;
use App\Models\Carrera;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AlumnoController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('admin/alumnos/Index', [
            'filters' => $request->only('search', 'nombre', 'apellido'),
            'carreras' => Carrera::all(),
            'alumnos' => Alumno::with('carreras')
                ->orderBy('apellido')
                ->paginate(10)
                ->withQueryString()  // Mantiene los parámetros de búsqueda en la paginación
        ]);
    }

    public function store(Request $request)
    {   
        try {
            $validated = $request->validate([
                'nombre'=> 'required|string|max:45|min:2',
                'apellido'=> 'required|string|max:45|min:2',
                'dni' => 'required|string|max:8|min:2',
                'carreras' => 'array', // Validación para las carreras
                'carreras.*' => 'exists:carreras,id' // Verifica que existan
            ]);
    
            Alumno::create($validated); // Usar $validated aquí

            if (isset($validated['carreras'])) {
                $alumno->carreras()->sync($validated['carreras']);
            }
    
            return redirect()->route('alumnos.index')->with('success', 'Alumno creado.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al crear el alumno: ' . $e->getMessage());
        }
    }

    public function update(Request $request, Alumno $alumno)
    {
        $validated = $request->validate([
            'nombre' => [
                'required',
                'string',
                'unique:alumnos,nombre,' . $alumno->id
            ],
            'apellido' => [
                'required',
                'string',
                'unique:alumnos,apellido,' . $alumno->id
            ],
            'dni' => [
                'required',
                'string',
                'unique:alumnos,dni,' . $alumno->id
            ],
            'carreras' => 'array',
            'carreras.*' => 'exists:carreras,id'
        ]);

        try {
            $alumno->update($validated);
            return redirect()->route('admin.alumnos.index')
                ->with('success', 'Alumno actualizado exitosamente');
        } catch (\Exception $e) {
            return back()
                ->with('error', 'No se pudo actualizar el alumno: ' . $e->getMessage());
        }
    }

    public function destroy(Alumno $alumno)
    {
        try {
            $alumno->delete();
            return redirect()->route('admin.alumnos.index')
                ->with('success', 'Alumno eliminado exitosamente');
        } catch (\Exception $e) {
            return redirect()->route('admin.alumnos.index')
                ->with('error', 'No se pudo eliminar el alumno: ' . $e->getMessage());
        }
    }

    public function getalumnos() {
        return Alumno::select('id', 'nombre', 'apellido', 'dni')
            ->orderBy('apellido')
            ->get();
    }

}
