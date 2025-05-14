import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { ConvenioTipoFormProps } from '@/types';
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
});

export function ConvenioTipoForm({
    initialData = { nombre: '' },
    onSubmitRoute,
    onSuccess,
    processing,
    errors: inertiaErrors,
}: ConvenioTipoFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: initialData.nombre || '',
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
                                    placeholder="Ej: Convenio marco, Específico, etc."
                                    disabled={processing}
                                />
                            </FormControl>
                            <FormMessage />
                            {inertiaErrors.nombre && (
                                <p className="text-destructive text-sm">{inertiaErrors.nombre}</p>
                            )}
                            <FormDescription>
                                Nombre descriptivo para este tipo de convenio
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
