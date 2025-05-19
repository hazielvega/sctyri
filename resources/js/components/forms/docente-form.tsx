import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { DocenteFormProps } from '@/types/docente';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';

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
    rol: z
        .string()
        .min(2, { message: 'El rol debe tener al menos 2 caracteres' })
        .max(45, { message: 'El rol no puede exceder los 45 caracteres' }),
});

export function DocenteForm({
    initialData = { nombre: '', apellido: '', rol: '' },
    onSubmitRoute,
    onSuccess,
    processing,
    errors: inertiaErrors,
}: DocenteFormProps ) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: initialData.nombre || '',
            apellido: initialData.apellido || '',
            rol: initialData.rol || '',
        },
    });

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
                    form.setError('rol', {
                        type: 'manual',
                        message: errors.rol,
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
                    name="rol"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rol</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Rol del docente"
                                    disabled={processing}
                                />
                            </FormControl>
                            <FormMessage />
                            {inertiaErrors.rol && (
                                <p className="text-destructive text-sm">{inertiaErrors.rol}</p>
                            )}
                            <FormDescription>
                                Rol
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
