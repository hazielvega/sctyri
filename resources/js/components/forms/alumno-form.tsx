import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { AlumnoFormProps } from '@/types/alumno';
import { Alumno } from '@/types/alumno';
import { Carrera } from '@/types/carrera';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect, useState } from 'react'; // Import useState
import axios from 'axios';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';

// Validación cliente con Zod
const formSchema = z.object({
    nombre: z
        .string()
        .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
        .max(45, { message: 'El nombre no puede exceder los 45 caracteres' }),
    apellido: z
        .string()
        .min(2, { message: 'El apellido debe tener al menos 2 caracteres' })
        .max(45, { message: 'El apellido no puede exceder los 45 caracteres' }),
    dni: z
        .string()
        .min(2, { message: 'El rol debe tener al menos 2 caracteres' })
        .max(45, { message: 'El rol no puede exceder los 8 caracteres' }),
    carrera_id: z
        .number({
            required_error: "La carrera es requerida",
            invalid_type_error: "La carrera debe ser un número válido",
        })
        .int("La carrera debe ser un número entero")
        .positive("La carrera debe ser un ID válido"),
});

export function AlumnoForm({
    initialData = { nombre: '', apellido: '', dni: '' },
    onSubmitRoute,
    onSuccess,
    processing,
    errors: inertiaErrors,
}: AlumnoFormProps ) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: initialData.nombre || '',
            apellido: initialData.apellido || '',
            dni: initialData.dni || '',
        },
    });

    const [carrera, setCarreras] = useState<Carrera[]>([]);
    const [loadingCarreras, setLoadingCarreras] = useState(false);

    useEffect(() => {
    setLoadingCarreras(true);
    axios.get('admin/carreras/list') // Usar ruta API directa
        .then(response => {
        setCarreras(response.data);
        })
        .catch(error => {
        console.error('Error cargando carreras:', error);
        })
        .finally(() => {
        setLoadingCarreras(false);
        });
    }, []);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const method = initialData.id ? 'put' : 'post';

        router[method](onSubmitRoute, {
            ...values,
        }, {
            onSuccess: () => {
                onSuccess?.();
            },
            onError: (errors) => {
                if (errors.nombre) {
                    form.setError('nombre', {
                        type: 'manual',
                        message: errors.nombre,
                    });
                    form.setError('apellido', {
                        type: 'manual',
                        message: errors.apellido,
                    });
                    form.setError('dni', {
                        type: 'manual',
                        message: errors.dni,
                    });
                }
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Nombre del docente"
                                    disabled={processing}
                                />
                            </FormControl>
                            <FormMessage />
                            {inertiaErrors.nombre && (
                                <p className="text-destructive text-sm">{inertiaErrors.nombre}</p>
                            )}
                            <FormDescription>
                                Nombre
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="apellido"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Apellido</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Apellido del docente"
                                    disabled={processing}
                                />
                            </FormControl>
                            <FormMessage />
                            {inertiaErrors.apellido && (
                                <p className="text-destructive text-sm">{inertiaErrors.apellido}</p>
                            )}
                            <FormDescription>
                                Apellido
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dni"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>DNI</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="DNI del docente"
                                    disabled={processing}
                                />
                            </FormControl>
                            <FormMessage />
                            {inertiaErrors.dni && (
                                <p className="text-destructive text-sm">{inertiaErrors.dni}</p>
                            )}
                            <FormDescription>
                                Documento Nacional de Identidad
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="carrera_id"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Carrera</FormLabel>
                        <FormControl>
                            <Select
                            value={field.value ? String(field.value) : ''}
                            onValueChange={val => field.onChange(val ? Number(val) : undefined)}
                            disabled={processing || loadingCarreras}
                            >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={
                                loadingCarreras ? "Cargando carreras..." : "Selecciona la carrera"
                                } />
                            </SelectTrigger>
                            <SelectContent>
                                {loadingCarreras ? (
                                <SelectItem value="loading" disabled>
                                    Cargando carreras...
                                </SelectItem>
                                ) : (
                                carrera.map((carrera) => (
                                    <SelectItem key={carrera.id} value={String(carrera.id)}>
                                        {carrera.nombre}
                                    </SelectItem>
                                ))
                                )}
                            </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                        {inertiaErrors.facultad_id && (
                            <p className="text-destructive text-sm">{inertiaErrors.facultad_id}</p>
                        )}
                        <FormDescription>
                            Facultad
                        </FormDescription>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-4">
                    <Button
                        variant="outline"
                        type="button"
                        disabled={processing}
                        onClick={onSuccess}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Guardando...' : 'Guardar'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

