import React from 'react';
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Asegúrate de tener este componente
import { Head } from '@inertiajs/react';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import { Docente } from '@/types/docente';

const EditDocente = () => {
  const { docente } = usePage<{ docente: Docente }>().props;
  const { data, setData, errors, put, processing } = useForm({
    nombre: docente.nombre || '',
    rol: docente.rol || '',
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route('admin.docentes.update', docente.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this organization?')) {
      router.delete(route('admin.docentes.destroy', docente.id));
    }
  }

  /*function restore() {
    if (confirm('Are you sure you want to restore this organization?')) {
      router.put(route('organizations.restore', docente.id));
    }
  }*/

  return (
    <div>
      <Head title={data.nombre} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('admin.docentes.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Docentes
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.nombre}
      </h1>
      {/*{organization.deleted_at && (
        <TrashedMessage
          message="This organization has been deleted."
          onRestore={restore}
        />
      )}*/}
        <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
            <form onSubmit={handleSubmit} className="space-y-8 p-8">
                <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                        id="nombre"
                        name="nombre"
                        value={data.nombre}
                        onChange={e => setData('nombre', e.target.value)}
                    />
                    {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="rol">Rol</Label>
                    <Input
                        id="rol"
                        name="rol"
                        value={data.rol}
                        onChange={e => setData('rol', e.target.value)}
                    />
                    {errors.rol && <p className="text-sm text-red-500">{errors.rol}</p>}
                </div>

                <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
                    <Button
                        disabled={processing}
                        type="submit"
                        className="btn-indigo"
                    >
                        {processing ? 'Editando...' : 'Editar Docente'}
                    </Button>

                    <Button
                        disabled={processing}
                        type="submit"
                        className="btn-indigo"
                        onClick={destroy}
                    >
                        {processing ? 'Eliminado...' : 'Eliminar Docente'}
                    </Button>
                </div>

                <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
 
                </div>
            </form>
        </div>
    </div>
  );
};

EditDocente.layout = (page: React.ReactNode) => (
    <AppLayout children={page} />
);

export default EditDocente;