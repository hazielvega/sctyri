import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { FacultadFormProps, Facultad } from '@/types/facultad';
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
    SelectItem
} from '@/components/ui/select';

// Validación cliente con Zod
const formSchema = z.object({
    nombre: z
        .string()
        .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
        .max(45, { message: 'El nombre no puede exceder los 45 caracteres' }),
    facultad_id: z
      .number({
        required_error: "La facultad es requerida",
        invalid_type_error: "La facultad debe ser un número válido",
      })
      .int("La facultad debe ser un número entero")
      .positive("La facultad debe ser un ID válido"),
});

export function CarreraForm({
    initialData = { nombre: '' },
    onSubmitRoute,
    onSuccess,
    processing,
    errors: inertiaErrors,
}: FacultadFormProps ) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: initialData.nombre || '',
        },
    });

    const [facultad, setFacultades] = useState<Facultad[]>([]);
    const [loadingFacultades, setLoadingFacultades] = useState(false);

    useEffect(() => {
    setLoadingFacultades(true);
    axios.get('admin/facultades/list') // Usar ruta API directa
        .then(response => {
        setFacultades(response.data);
        })
        .catch(error => {
        console.error('Error cargando facultades:', error);
        })
        .finally(() => {
        setLoadingFacultades(false);
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
                    form.setError('facultad_id', {
                        type: 'manual',
                        message: errors.facultad_id,
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
                    name="facultad_id"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Facultad</FormLabel>
                        <FormControl>
                            <Select
                            value={field.value ? String(field.value) : ''}
                            onValueChange={val => field.onChange(val ? Number(val) : undefined)}
                            disabled={processing || loadingFacultades}
                            >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={
                                loadingFacultades ? "Cargando facultades..." : "Selecciona la facultad"
                                } />
                            </SelectTrigger>
                            <SelectContent>
                                {loadingFacultades ? (
                                <SelectItem value="loading" disabled>
                                    Cargando facultades...
                                </SelectItem>
                                ) : (
                                facultad.map((facultad) => (
                                    <SelectItem key={facultad.id} value={String(facultad.id)}>
                                        {facultad.nombre}
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

