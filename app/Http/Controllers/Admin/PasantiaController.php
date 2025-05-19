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

    public function store(Request $request) 
    {   
        try {
            $validated = $request->validate([
                'fecha_acta'=> 'required|date',
                'fecha_inicio'=> 'required|date',
                'duracion'=> 'required|integer',
                'fecha_fin'=> 'required|date',
                'monto'=> 'required|numeric',
                'domicilio'=> 'required|string|max:45|min:2',
                'tareas'=> 'required|string|max:100|min:2',
                'estado'=> 'required|string|max:45|min:2',
                'docente_id'=> 'required|integer',
            ]);
    
            Pasantia::create($validated); // Usar $validated aquí
    
            return redirect()->route('pasantias.index')->with('success', 'Pasantia creada.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al crear la pasantia: ' . $e->getMessage());
        }
    }

    public function update(Request $request, Pasantia $pasantia)
    {
        $validated = $request->validate([
            'fecha_acta' => [
                'required',
                'date',
                Rule::unique('pasantia', 'fecha_acta')->ignore($pasantia->id)
            ],
            'fecha_inicio' => [
                'required',
                'date',
                Rule::unique('pasantias', 'fecha_inicio')->ignore($pasantia->id)
            ],
            'duracion' => [
                'required',
                'integer',
                Rule::unique('pasantias', 'duracion')->ignore($pasantia->id)
            ],
            'fecha_fin' => [
                'required',
                'date',
                Rule::unique('pasantias', 'fecha_fin')->ignore($pasantia->id)
            ],
            'monto' => [
                'required',
                'numeric',
                Rule::unique('pasantias', 'monto')->ignore($pasantia->id)
            ],
            'domicilio' => [
                'required',
                'string',
                'max:45',
                'min:2',
                Rule::unique('pasantias', 'domicilio')->ignore($pasantia->id)
            ],
            'tareas' => [
                'required',
                'string',
                'max:100',
            ],
            'estado' => [
                'required',
                'string',
                'max:45',
                'min:2',
                Rule::unique('pasantias', 'estado')->ignore($pasantia->id)
            ],
            'docente_id' => [
                'required',
                'integer',
                Rule::unique('pasantias', 'docente_id')->ignore($pasantia->id)
            ],
        ]);

        try {
            $pasantia->update($validated);
            return redirect()->route('admin.pasantias.index')
                ->with('success', 'Pasantia actualizada exitosamente');
        } catch (\Exception $e) {
            return back()
                ->with('error', 'No se pudo actualizar la pasantia: ' . $e->getMessage());
        }
    }

    public function destroy(Pasantia $pasantia)
    {
        try {
            $pasantia->delete();
            return redirect()->route('admin.pasantias.index')
                ->with('success', 'La pasantia eliminado exitosamente');
        } catch (\Exception $e) {
            return redirect()->route('admin.pasantias.index')
                ->with('error', 'No se pudo eliminar la pasantia: ' . $e->getMessage());
        }
    }
}
