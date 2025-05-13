import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm as useInertiaForm } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Definir el esquema de validación con Zod
const docenteSchema = z.object({
  nombre: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(45, "El nombre no puede exceder 45 caracteres"),
  rol: z.string()
    .min(2, "El rol debe tener al menos 2 caracteres")
    .max(45, "El rol no puede exceder 45 caracteres"),
});

// Inferir el tipo TypeScript del esquema
type DocenteFormData = z.infer<typeof docenteSchema>;

const CreateDocente = () => {
  // Formulario de Inertia para el envío
  const inertiaForm = useInertiaForm();
  
  // Formulario de React Hook Form para validación
  const {
    register,
    handleSubmit,
    formState: { errors: zodErrors},
    setValue,
    watch,
  } = useForm<DocenteFormData>({
    resolver: zodResolver(docenteSchema),
    defaultValues: {
      nombre: '',
      rol: '',
    },
  });

  // Función para enviar los datos validados
  const onSubmit = (data: DocenteFormData) => {
    inertiaForm.post(route('admin.docentes.store'), {
      ...data,
      onError: () => {
        // Manejar errores del servidor si es necesario
      },
    });
  };

  return (
    <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-8">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            {...register('nombre')}
            onChange={(e) => setValue('nombre', e.target.value)}
            value={watch('nombre')}
          />
          {zodErrors.nombre && (
            <p className="text-sm text-red-500">{zodErrors.nombre.message}</p>
          )}
          {inertiaForm.errors.nombre && (
            <p className="text-sm text-red-500">{inertiaForm.errors.nombre}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="rol">Rol</Label>
          <Input
            id="rol"
            {...register('rol')}
            onChange={(e) => setValue('rol', e.target.value)}
            value={watch('rol')}
          />
          {zodErrors.rol && (
            <p className="text-sm text-red-500">{zodErrors.rol.message}</p>
          )}
          {inertiaForm.errors.rol && (
            <p className="text-sm text-red-500">{inertiaForm.errors.rol}</p>
          )}
        </div>

        <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
          <Button
            disabled={inertiaForm.processing}
            type="submit"
            className="btn-indigo"
          >
            {inertiaForm.processing ? 'Creando...' : 'Crear Docente'}
          </Button>
        </div>
      </form>
    </div>
  );
};

CreateDocente.layout = (page: React.ReactNode) => (
  <AppLayout children={page} />
);

export default CreateDocente;