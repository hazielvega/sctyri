<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ConvenioTipo;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ConvenioTipoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $convenioTipos = ConvenioTipo::paginate(10);
        return Inertia::render('admin/ConvenioTipos/Index', compact('convenioTipos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/ConvenioTipos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => [
                'required',
                'string',
                Rule::unique('convenio_tipos', 'nombre')
            ],
        ]);

        try {
            ConvenioTipo::create($validated);
            return redirect()->route('admin.convenio-tipos.index')
                ->with('success', 'Tipo de convenio creado exitosamente');
        } catch (\Exception $e) {
            return back()
                ->with('error', 'No se pudo crear el tipo de convenio: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ConvenioTipo $convenioTipo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ConvenioTipo $convenioTipo)
    {
        return response()->json($convenioTipo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ConvenioTipo $convenioTipo)
    {
        $validated = $request->validate([
            'nombre' => [
                'required',
                'string',
                Rule::unique('convenio_tipos', 'nombre')->ignore($convenioTipo->id)
            ],
        ]);

        try {
            $convenioTipo->update($validated);
            return redirect()->route('admin.convenio-tipos.index')
                ->with('success', 'Tipo de convenio actualizado exitosamente');
        } catch (\Exception $e) {
            return back()
                ->with('error', 'No se pudo actualizar el tipo de convenio: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ConvenioTipo $convenioTipo)
    {
        try {
            $convenioTipo->delete();
            return redirect()->route('admin.convenio-tipos.index')
                ->with('success', 'Tipo de convenio eliminado exitosamente');
        } catch (\Exception $e) {
            return redirect()->route('admin.convenio-tipos.index')
                ->with('error', 'No se pudo eliminar el tipo de convenio: ' . $e->getMessage());
        }
    }

    public function checkNombre(Request $request)
    {
        $nombre = $request->get('nombre');
        $id = $request->get('id'); // Para excluir el actual en edición

        $query = ConvenioTipo::where('nombre', $nombre);

        if ($id) {
            $query->where('id', '!=', $id);
        }

        return response()->json(['exists' => $query->exists()]);
    }
}
